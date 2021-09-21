import { minutesToDuration } from "../utils/duration/index";

// displays the total (not leftover) set duration of the current session
function CurrentSessionTotalDuration({currentSession, focusDuration, breakDuration}) {
    return currentSession?.label === 'Focusing' ? minutesToDuration(focusDuration) : minutesToDuration(breakDuration)
  }

export default CurrentSessionTotalDuration;