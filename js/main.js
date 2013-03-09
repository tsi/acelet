(function($) {

  $(document).ready(function() {
    var acelet, val, opt;
    var options = {
      syntax: "text",
      fontSize: "16px",
      theme: "ace/theme/monokai",
      softTabs: true,
      tabSize: 2,
      wrapText: true,
      indentGuides: true,
      showInvisibles: true
    };
    var updateAcelet = function() {
      acelet = "javascript:(function(){var aceletTab=window.open('about:blank');var script=document.createElement('script');script.type='text/javascript';script.id='aceletScript';script.async=true;script.onload=function(){aceletTab.location=acelet('"+options.syntax+"','"+options.fontSize+"','"+options.theme+"','"+options.softTabs+"','"+options.tabSize+"','"+options.wrapText+"','"+options.indentGuides+"','"+options.showInvisibles+"');aceletTab.focus();};script.src='https://raw.github.com/tsi/acelet/master/acelet.min.js';document.body.appendChild(script);}());";
      $('a.acelet').attr('href', acelet);
    };

    $('select, input', 'section.defaults').change(function() {
      var el = $(this);
      opt = el.attr('id');
      val = el.val();
      if (el.is('[type="checkbox"]')) {
        val = el.is(':checked') ? true : false;
      }
      options[opt] = val;
      updateAcelet();
    });

    updateAcelet();

  });
})(jQuery);


// Async Sharing Buttons (Facebook, Twitter)
// http://css-tricks.com/snippets/javascript/async-sharing-buttons-g-facebook-twitter/
(function(doc, script) {
  var js, 
      fjs = doc.getElementsByTagName(script)[0],
      frag = doc.createDocumentFragment(),
      add = function(url, id) {
          if (doc.getElementById(id)) {return;}
          js = doc.createElement(script);
          js.src = url;
          id && (js.id = id);
          frag.appendChild( js );
      };
      
    // Facebook SDK
    add('//connect.facebook.net/en_US/all.js#xfbml=1&appId=200103733347528', 'facebook-jssdk');
    // Twitter SDK
    add('//platform.twitter.com/widgets.js');

    fjs.parentNode.insertBefore(frag, fjs);
}(document, 'script'));
