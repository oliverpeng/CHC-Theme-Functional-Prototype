<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!-- Consider adding an manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">

  <!-- Use the .htaccess and remove these lines to avoid edge case issues.
       More info: h5bp.com/b/378 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>Churches Helping Churches - Sign Up</title>
  <meta name="description" content="">
  <meta name="author" content="">

  <!-- Mobile viewport optimized: j.mp/bplateviewport -->
  <meta name="viewport" content="width=device-width,initial-scale=1">

  <!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->

  <!-- CSS: implied media=all -->
  <!-- CSS concatenated and minified via ant build script-->
  <link rel="stylesheet" href="css/ui-lightness/jquery-ui-1.8.16.custom.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/signup.css">
  <!-- end CSS-->

  <!-- More ideas for your <head> here: h5bp.com/d/head-Tips -->

  <!-- All JavaScript at the bottom, except for Modernizr / Respond.
       Modernizr enables HTML5 elements & feature detects; Respond is a polyfill for min/max-width CSS3 Media Queries
       For optimal performance, use a custom Modernizr build: www.modernizr.com/download/ -->
  <script src="js/libs/modernizr-2.0.6.min.js"></script>
</head>

<body>

  <div id="container">
    <header>
  	  <h1 id="logo" class="ir"><a href="index.html" title="Home">Chuches Helping Churches</a></h1>
	  <input type="text" name="search" id="search" placeholder="SEARCH BLOG..." >
	  <ul id="social">
		<li class="ir"><a href="media.html">Media</a></li>
		<li class="ir"><a href="https://www.facebook.com/ChurchesHelpingChurches" target="_blank">Facebook</a></li>
		<li class="ir"><a href="http://twitter.com/#!/churcheshelping" target="_blank">Twitter</a></li>
		<li class="ir"><a href="http://www.youtube.com/user/churcheshelping" target="_blank">Youtube</a></li>
		<li class="ir"><a href="">Subscribe</a></li>
	  </ul>
	  <ul id="join-give">
		<li class="ir"><a href="join.html">Join Now</a></li>
		<li class="ir"><a href="give.html">Give Now</a></li>
	  </ul>
    </header>
	<nav>
	  <h2 hidden>Main Navigation</h2>
	  <ul>
		<li><a href="index.html">Home</a></li>
		<li><a href="join.html">Join Us</a></li>
		<li><a href="what-we-do.html">What We Do</a></li>
		<li><a href="who-we-are.html" class="active">Who We Are</a></li>
		<li><a href="churches.html">The Churches</a></li>
		<li><a href="">Blog</a></li>
	  </ul>
	</nav>
	<article id="main">
	  <h2>Sign Up</h2>
	  <?php
	  
	  $error = false;
	  $errorMsg;
	  
	  if (isset($_POST['submit'])) {	
		// Validation
		$email = $_POST['email'];
		if (!$email) {
		  $error = true;
		  $errorMsg = 'Please enter an email address';
		} else {
		  $pattern = "/^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/";
		  if (!preg_match($pattern, $email)) {
            $error = true;
			$errorMsg = 'Please enter a valid email address';
		  }
		  
		  if (!$error && strlen($email) > 100){
			$error = true;
			$errorMsg = 'Address is too long';
		  }
		}
		
		if (!$error) {
		  require_once('includes/MCAPI.class.php');
		  $api = new MCAPI('420524bc6e7e2495ddd87a95dd48a3dd-us1');
		  $list_id = '9b182b13d8';
		  $merge_vars = array('FNAME'=>$_POST['fname'], 'LNAME'=>$_POST['lname'],
						  'CITY'=>$_POST['city'], 'STATE'=>$_POST['state'],
						  'CHURCH'=>$_POST['church'], 'WEBSITE'=>$_POST['website'],
						  'PREFER'=>$_POST['prefer']);
		  if(isset($_POST['is_pastor'])) {
			$merge_vars['PASTOR'] = 1;
		  }
		  
		  if($api->listSubscribe($list_id, $_POST['email'], $merge_vars) === true) {
			// redirect
			echo 'Success! Check your email to confirm sign up.';
		  }else{
			// An error ocurred, return error message	
			echo 'Error: ' . $api->errorMessage;
		  }
		}
	  }
	  
	  ?>
      <form class="clearfix" method="post" >
        <div id="info">
          <h3>1. Please fill out your information</h3>
          
          <div class="clearfix">
            <div class="fname">
              <label for="fname">First Name</label>
              <input type="text" id="fname" name="fname" value="<?php echo $_POST['fname']?>">
            </div>
            <div class="lname">
              <label for="lname">Last Name</label>
              <input type="text" id="lname" name="lname" value="<?php echo $_POST['lname']?>">
            </div>
          </div>
          
          <label for="city">City</label>
          <input type="text" id="city" name="city" value="<?php echo $_POST['city']?>">
          
          <div class="clearfix">
            <div class="state">
              <label for="state">State / Province</label>
              <input type="text" id="state" name="state" value="<?php echo $_POST['state']?>">
            </div>
            <div class="country">
              <label for="country">Country</label>
              <input type="text" id="country" name="country" value="<?php echo $_POST['country']?>">
            </div>
          </div>
            
          <label for="email">Email Address <span class="required">*</span></label>
          <input type="text" id="email" name="email" value="<?php echo $_POST['email']?>">
		  <span class="error"><?php if ($error) { echo $errorMsg; } ?></span>
		  
          <label for="church">Church Name</label>
          <input type="text" id="church" name="church" value="<?php echo $_POST['church']?>">
            
          <input type="checkbox" id="is_pastor" name="is_pastor" <?php if(isset($_POST['is_pastor'])) { echo 'checked'; } ?>>
		  <label for="is_pastor">Check here if you are a pastor.</label>
            
          <label for="website">Website</label>
          <input type="text" id="website" name="website" value="<?php echo $_POST['website']?>">
            
          <p>* indicates required field</p>
        </div>
        <div id="email-pref">
          <h3>2. Set your email preferences</h3>
          
          <p>
            As a Churches Helping Churches partner, you play a critical role in
            the health and impact of our ministry.  Below are email preferences
            that will help us keep you informed. Select what’s right for you,
            and we’ll do the rest.
          </p>
          
          <ul>
            <li class="clearfix">
              <input type="radio" name="prefer" value="All" id="prefer-0" <?php if(!isset($_POST['prefer']) || $_POST['prefer'] == 'All') { echo 'checked="checked"'; } ?>>
              <label for="prefer-0">Please keep me on your standard newsletter list for complete coverage of the Churches Helping Churches movement.</label>
            </li>
            <li class="clearfix">
              <input type="radio" name="prefer" value="Major Updates" id="prefer-1" <?php if(isset($_POST['prefer']) && $_POST['prefer'] == 'Major Updates') { echo 'checked="checked"'; } ?>>
              <label for="prefer-1">Please keep me up-to-date on key Churches Helping Churches projects, events, and milestones.</label>
            </li>
            <li class="clearfix">
              <input type="radio" name="prefer" value="New Crises" id="prefer-2" <?php if(isset($_POST['prefer']) && $_POST['prefer'] == 'New Crises') { echo 'checked="checked"'; } ?>>
              <label for="prefer-2">Please only contact me with major news related to new crises</label>
            </li>
            <li class="clearfix">
              <input type="radio" name="prefer" value="None" id="prefer-3" <?php if(isset($_POST['prefer']) && $_POST['prefer'] == 'None') { echo 'checked="checked"'; } ?>>
              <label for="prefer-3">Please do not send any emails to me.</label>
            </li>
          </ul>
          
          <input type="submit" name="submit" value="SIGN UP" class="greenbutton">
        </div>
      </form>
      
      
	</article>
	<footer>
	  <div>
		<p><a id="footer-contact">Contact Us</a></p><p>&copy; CHURCHES<span class="highlight">HELPING</span>CHURCHES</p>
	  </div>
	  <p>Co-founders: <a href="http://jamesmacdonald.com/" target="_blank">jamesmacdonald.com</a> & <a href="http://pastormark.tv/" target="_blank">pastormark.tv</a></p>
	</footer>
  </div> <!--! end of #container -->
  <div class="dialog" id="contact-dialog">
    <h4>Contact Information</h4>
    <h5>Mailing Address</h5>
    <p>
      Churches Helping Churches<br>
      P.O. Box 6558<br>
      Elgin, IL<br>
      60121-6558<br>
    </p>
    <h5>Street Address</h5>
    <p>
      Churches Helping Churches<br>
      c/o Harvest Bible Chapel<br>
      1000 N. Randall Road<br>
      Elgin, IL 60123<br>
    </p>
    <h5>Phone</h5>
    <p>1-847-398-7024 ext. 3452</p>
    <h5>Email Address</h5>
    <p>information@churcheshelpingchurches.com</p>
  </div>


  <!-- JavaScript at the bottom for fast page loading -->

  <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.6.2.min.js"><\/script>')</script>


  <!-- scripts concatenated and minified via ant build script-->
  <script src="js/libs/jquery-ui-1.8.16.custom.min.js"></script>
  <script src="js/libs/jquery.tinyscrollbar.js"></script>
  <script defer src="js/plugins.js"></script>
  <script defer src="js/script.js"></script>
  <script defer src="js/who-we-are.js"></script>
  <!-- end scripts-->

	
  <!-- Change UA-XXXXX-X to be your site's ID -->
  <!--
  <script>
    window._gaq = [['_setAccount','UAXXXXXXXX1'],['_trackPageview'],['_trackPageLoadTime']];
    Modernizr.load({
      load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
    });
  </script>
  -->

  <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you want to support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
  <!--[if lt IE 7 ]>
    <script src="http://ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
    <script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
  <![endif]-->
  
</body>
</html>
