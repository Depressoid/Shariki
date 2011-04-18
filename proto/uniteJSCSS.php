<?php


function getJsAndCssFiles(&$js, &$css)
{
   $path = dirname(__FILE__). '/js/js_css.html';

   if ($text = @file_get_contents($path))
   {
      // удаление комментариев
      $text = preg_replace( "/<!--.*?-->/is", '', $text );

      $pattern_js = '/<script[^>]+src="([^>]+\.js)"[^>]*>/im';
      $pattern_css = '/<link[^>]+href="([^>]+\.css)"[^>]*\/>/im';

      $matches = array();
      if (preg_match_all($pattern_css, $text, $matches))
         $css = $matches[1];

      $matches = array();
      if (preg_match_all($pattern_js, $text, $matches))
         $js = $matches[1];

   }
}

function unionFiles($js, $css)
{
   $js_tmp_path = dirname(__FILE__). '/tmp.js';
   $css_tmp_path = dirname(__FILE__). '/tmp.css';
   if ($js_file = @fopen($js_tmp_path, 'w'))
   {
      fwrite($js_file, "(function(){\n");
      foreach ($js as $file_path)
         fwrite($js_file, @file_get_contents(dirname(__FILE__).$file_path) . "\n");
      fwrite($js_file, "\n})();");
      fclose($js_file);
      unset($js_file);
   }

   if ($css_file = @fopen($css_tmp_path, 'w'))
   {
      foreach ($css as $file_path)
         fwrite($css_file, @file_get_contents(dirname(__FILE__).$file_path) . "\n");
      fclose($css_file);
      unset($css_file);
   }

}

function revisionInfo()
{
   return 1;
}

$js = array();
$css = array();

getJsAndCssFiles($js, $css);
unionFiles($js, $css);
if ($revision = revisionInfo())
{
   `java -jar yuicompressor-2.4.2.jar --type js --charset utf-8  -o unite.js tmp.js`;
   `java -jar yuicompressor-2.4.2.jar --type css --charset utf-8  -o unite.css tmp.css`;
   $js_file = "{$revision}.js";
   $css_file = "{$revision}.css";
   if (file_exists($js_file))
      unlink($js_file);
   if (file_exists($css_file))
      unlink($css_file);

   rename('unite.js', $js_file);
   rename('unite.css', $css_file);
   copy($js_file, "js/$js_file");
   copy($css_file, "css/$css_file");

   unlink($js_file);
   unlink($css_file);
   unlink('tmp.js');
   unlink('tmp.css');
}






