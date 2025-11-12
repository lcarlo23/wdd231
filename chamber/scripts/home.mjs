import navToggle from "./navigation.mjs";
import getDates from "./getdates.mjs";
import apiFetch from "./weather.mjs";
import getSpotlightMembers from "./members-spotlight.mjs";

navToggle();
apiFetch();
getSpotlightMembers();
getDates();