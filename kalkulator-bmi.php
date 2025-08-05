<?php
/*
Plugin Name: Kalkulator BMI
Description: Plugin Kalkulator BMI dan Gizi Anak
Version: 1.0
Author: Nama Kamu
*/

// Shortcode untuk menampilkan form
function tampilkan_kalkulator_bmi() {
    ob_start();
    include plugin_dir_path(__FILE__) . 'form.html';
    return ob_get_clean();
}
add_shortcode('kalkulator_bmi', 'tampilkan_kalkulator_bmi');

// Memanggil CSS dan JS
function bmi_assets() {
    wp_enqueue_style('bmi-style', plugin_dir_url(__FILE__) . 'assets/style.css');
    wp_enqueue_script('bmi-script', plugin_dir_url(__FILE__) . 'assets/script.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'bmi_assets');

?><?php