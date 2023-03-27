package com.membrane.reactnativemembrane;
import android.content.ContentResolver;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.WindowManager;

import expo.modules.ReactActivityDelegateWrapper;
import com.facebook.react.ReactActivityDelegate;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MembraneExample";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
      new ReactActivityDelegate(this, getMainComponentName())
    );
  }

  // https://johncodeos.com/how-to-make-your-android-app-compatible-with-gesture-navigation-using-kotlin/
  private boolean isGestureNavigationEnabled( ContentResolver contentResolver) {
    return Settings.Secure.getInt(contentResolver, "navigation_mode", 0) == 2;
  }

  private void handleGestureNavigation() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      if (isGestureNavigationEnabled(getContentResolver())) {
        // Extends the PhotoView in the whole screen
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        // Hides StatusBar and Navigation bar, you have to tap to appear
        // window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_IMMERSIVE or View.SYSTEM_UI_FLAG_FULLSCREEN or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
        // Fixes the Full Screen black bar in screen with notch
        getWindow().getAttributes().layoutInDisplayCutoutMode =
          WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
      }
    }
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    handleGestureNavigation();
  }
}
