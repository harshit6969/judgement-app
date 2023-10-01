import players from "../players";
const PLAYERS_KEY = "players_XAED0069";

function setValue(key, value) {
    console.log(value);
    localStorage.setItem(key, JSON.stringify(value));
}

function getValue(key) {
    return JSON.parse(localStorage.getItem(key))
}

function getPlayers() {
    return getValue(PLAYERS_KEY) || players;
}

function setPlayers(value = players) {
    return setValue(PLAYERS_KEY, value);
}

export { setValue, getValue, getPlayers, setPlayers };