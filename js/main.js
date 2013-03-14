(function($) {

  $(document).ready(function() {

    // Load external contents
    $("[data-html]").each(function() {
      el = $(this);
      var src = $(this).attr("data-html") + ".html";
      el.load(src, function() {
        aceletDemo();
      });
    });

    // Make the bookmarklet work
    var aceletDemo = function() {
      if ($('a.acelet').is('.acelet-processed')) {
        return false;
      }
      $('a.acelet').addClass('acelet-processed');
      var acelet, val, opt;
      var options = {
        syntax: "javascript",
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
        $('a.acelet').attr('href', acelet).addClass("highlight");
        window.setTimeout(function() {
          $('a.acelet').removeClass("highlight");
        }, 600);
      };

      $(document).on('change', 'select, input', function() {
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

      // Analytics
      var trackGA = function() {
        var isDown = false;

        $('a.acelet').on('mousedown', function(){
          isDown = true;
        });
        $('a.acelet').on('mouseup', function(){
          _gaq.push(['_trackEvent', $('select#syntax').val(), 'demo', $('select#theme').val()]);
          isDown = false;
        });
        $('#bookmarklet').on('mouseleave', function(){
          if(isDown){
            _gaq.push(['_trackEvent', $('select#syntax').val(), 'bookmarked', $('select#theme').val()]);
            isDown = false;
          }
        });

      };
      trackGA();

    };

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-39309928-1']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

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
