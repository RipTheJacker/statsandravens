import { useCallback } from 'react'
import { firstBy } from 'thenby'
import produce from 'immer'

const getGameWinner = (game) => {
  return game.results.slice().sort(
    firstBy('castles', 'desc')
      .thenBy('strongholds', 'desc')
      .thenBy('supply', 'desc')
      .thenBy('powerTokens', 'desc')
      .thenBy('ironThrone', 'desc')
  )[0]
}

const findPlayer = (game, player) => {
  return game.results.find(res => res.playerId === player.id)
}

const hasPlayer = (game, player) => !!findPlayer(game,player)

export const useStats = (games, players) => {
  const getStats = useCallback(() => {
    const gameWinners = games.map(game => getGameWinner(game)).filter(g => g)

    return players.reduce((mem, player) => {
      const wins = gameWinners.reduce((count, winner) => winner.playerId === player.id ? count + 1 : count, 0)
      const gamesPlayed = games.reduce((count, game) => hasPlayer(game, player) ? count + 1 : count, 0)
      const favoriteHouse = games.reduce((count, game) => {
        const gplayer = findPlayer(game, player)
        if (!gplayer) return count

        const house = gplayer.house
        return produce(count, draft => {
          draft[house] = (count[house] || 0) + 1
          const most = count[draft['most']] || 0
          if (draft[house] > most) draft['most'] = house
        })
      }, { most: null })

      return {...mem, [player.id]: { wins, gamesPlayed, favoriteHouse: favoriteHouse.most } }
    }, {})
  }, [games, players])

  return getStats
}
