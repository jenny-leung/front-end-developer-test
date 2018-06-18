<?php
  // replace jQuery
  function replace_jquery() {
    // jquery (v1.10.2 as of WP 3.8) includes jquery-core, jquery-migrate
    wp_deregister_script('jquery-core');
    wp_register_script('jquery-core', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', array(), '3.3.1', true);
    wp_enqueue_script('jquery-core');

    wp_deregister_script('jquery-migrate');
    wp_register_script('jquery-migrate', 'https://code.jquery.com/jquery-migrate-3.0.1.min.js', array(), '3.0.1', true);
    wp_enqueue_script('jquery-migrate');
  }
  // for scripts
  add_action('wp_enqueue_scripts', 'replace_jquery');
  // for wp-admin if necessary
  // add_action('admin_enqueue_scripts', 'replace_jquery');
?>
