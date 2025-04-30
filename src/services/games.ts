export const getOnlineGames = async () => {
    try {
        const response = await fetch(`/data/games.json`);
        const data = await response.json();
        return({ status: 200, data: data });
    } catch (error) {
        return({ status: 500, data: error });
    }
}