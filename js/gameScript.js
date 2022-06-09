var isUserReady = false;
var isGameLoaded = false;

window.addEventListener('nebulaInitialized', (e) => {
  nebula.gameSize.registerExitFullscreen(fullscreenExit);
  window.requestFullscreen = nebula.gameSize.requestFullscreen;
  window.addEventListener('progressBarDone', () => progressBarDone());

  $('#fullScreenButton').on('click', fullscreenButtonClicked);
  $('#playButton').on('click', playButtonClicked);

});

function UnityProgress(gameInstance, progressValue) {
  if (!gameInstance.Module || !nebula.initialized) {
    return;
  }
  nebula.progress.setProgress(document.querySelector("#loadingBar"), progressValue, null);
}

function fullscreenButtonClicked() {
  nebula.gameSize.requestFullscreen();
  $('#fullScreenButton').hide();
}
function fullscreenExit() {
  $('#fullScreenButton').show();
}

function playButtonClicked() {
  isUserReady = true;
  nebula.playClicked();
  $('#overlay').remove();
  if(isGameLoaded)
  {
    startGame();
  }
}

function progressBarDone(){
  isGameLoaded = true;
  $('#loadScreen').remove();
  if(isUserReady)
  {
    startGame()
  }
}

function startGame() {
  nebula.gameStarted();
  window.addEventListener('beforeunload', (e) => nebula.showBrowserClosePopup(e));
}
