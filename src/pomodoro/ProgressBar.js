function ProgressBar(session, focusDuration, breakDuration) {
    const focusSessionProgress = 1 - (session.timeRemaining / (focusDuration * 60));
    const breakSessionProgress = 1 - (session.timeRemaining / (breakDuration * 60));
    return focusDuration ? focusSessionProgress : breakSessionProgress;
}

export default ProgressBar;