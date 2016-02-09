<?php
// $Id$

/**
 * @file
 * Admin page callback for the uobanner module.
 */

function uobannerandfooter_admin_settings() {
  global $base_url;
  $form['#tree'] = TRUE;	// Prevent flattening the form values

  $uobannerandfooter = variable_get('uobannerandfooter', array()); // returns fieldset child fields as an array

  // Get a list of all available menus for menu select boxes
  $available_menus = array();
  $available_menus[] = 'none';
  $available_menus = array_merge($available_menus, menu_get_menus());

  // UO Banner and Footer (fieldset)

  $form['uobannerandfooter'] = array(
  '#type' => 'fieldset',
  '#title' => t('UO Banner and Footer Settings'),
  '#collapsible' => FALSE,
  '#collapsed' => FALSE,
  '#tree' => TRUE,
  );

  // General Settings (fieldset)

  $form['uobannerandfooter']['general'] = array(
  '#type' => 'fieldset',
  '#title' => t('General Settings'),
  '#description' => t('<p>On the UO Banner and Footer Setting page, you can select which information you would like to edit. The information is divided into four categories - General Settings for the quick links, Location and Map for your address, Contact Information for your phone number and contact us link, and Social Media Links to add the icons and links to your social media accounts.</p><p><a href="http://digital.uoregon.edu/content/formatting-footer#General Settings" target="_blank">Additional Help</a>'),
  '#weight' => -10,
  '#collapsible' => TRUE,
  '#collapsed' => TRUE,
  );


  // Page Width
  $form['uobannerandfooter']['general']['custom_page_width'] = array(
    '#title' => t('Custom Page Width (in pixels)'),
    '#type' => 'textfield',
    '#maxlength' => 4,
    '#size' => 10,
    '#default_value' => (!empty($uobannerandfooter['general']['custom_page_width']))
                    ? $uobannerandfooter['general']['custom_page_width']
                    : 1200,
    '#description' => t('Specify the width of your site in pixels. This field only accepts a numeric value.'),
    '#required' => TRUE,
  );

  // Utlity Links
  $form['uobannerandfooter']['general']['utility_links'] = array(
  '#title' => t('Utlity Links Menu'),
  '#type' => 'select',
  '#options' => $available_menus,
  '#default_value' => (!empty($uobannerandfooter['general']['utility_links']))
                  ? $uobannerandfooter['general']['utility_links']
                  : '',
  '#description' => t('Select a menu that contains your utility links (if applicable). These links will be displayed under "Take Action" in the responsive menu.'),
  '#required' => FALSE,
  );

  // Enable Hamburger Menu
  $form['uobannerandfooter']['general']['hamburger_menu'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Use hamburger menu in mobile navigation'),
    '#default_value' => (!empty($uobannerandfooter['general']['hamburger_menu']))
                  ? $uobannerandfooter['general']['hamburger_menu']
                  : FALSE,
    '#description'   => t("Select this enable the hamburger menu in the UOBanner for mobile. <strong>Important:</strong> If you are using the Cosmic theme and this option is disabled, your main menu will still disppear on screens smaller than 960px wide."),
  );

  // Hamburger Menu Primary Nav ID
  $form['uobannerandfooter']['general']['hamburger_menu_target'] = array(
  '#title' => t('Hamburger Menu Target'),
  '#type' => 'select',
  '#options' => $available_menus,
  '#default_value' => (!empty($uobannerandfooter['general']['hamburger_menu_target']))
                  ? $uobannerandfooter['general']['hamburger_menu_target']
                  : 'main-menu',
  '#description' => t('Select your primary nav menu. This controls what links appear in the hamburger menu.'),
  '#required' => FALSE,
  );

  // Custom Content (WYSIWYG)
   // text_format type saves data to array instead of string
  $custom_content_defaults = array(
  'value' => '',
  'format' => filter_default_format(),
  );

  $uobanner_custom_content = variable_get('uobanner_custom_content', $custom_content_defaults);

  $form['uobannerandfooter']['general']['custom_content'] = array(
  '#title' => t('Custom Footer Content'),
  '#type' => 'text_format',
  '#cols' => 10,
  '#resizable' => TRUE,
  '#rows' => 5,
  '#default_value' => (!empty($uobannerandfooter['general']['custom_content']))
                    ? $uobannerandfooter['general']['custom_content']['value']
                    : '',
  '#format' =>  (!empty($uobannerandfooter['general']['custom_content']))
                    ? $uobannerandfooter['general']['custom_content']['format']
                    : $custom_content_defaults['format'],
  '#description' => t('This content will be presented in the page footer, to the side of the contact information.'),
  '#required' => FALSE,
  );

  // Location and Map (fieldset)
  $form['uobannerandfooter']['address'] = array(
  '#type' => 'fieldset',
  '#title' => t('Location and Map'),
  '#description' => t('<p>In the Location and Map section, you can add your address, office number and a link to your location using Google maps. Use the Street Address boxes for your mailing address and use the Office box for your building and room number.</p><p>You can also add a link to your location on Google maps. If you go to maps.google.com and type in your building location, it should bring up that location on the map. If it is correct, you can copy the entire web address and paste it in the box for Google Maps URL below. When someone clicks on your address in the footer, it will bring up the map to your location in Google maps.</p><p><a href="http://digital.uoregon.edu/content/formatting-footer#Location and Map" target="_blank">Additional Help</a>'),
  '#weight' => -9,
  '#collapsible' => TRUE,
  '#collapsed' => TRUE,
  );

  // Street Address
  $form['uobannerandfooter']['address']['address_street'] = array(
  '#title' => t('Street Address'),
  '#type' => 'textfield',
  '#maxlength' => 80,
  '#size' => 80,
  '#default_value' => (!empty($uobannerandfooter['address']['address_street']))
                  ? $uobannerandfooter['address']['address_street']
                  : '',
  '#description' => t('If you are located on UO campus, please use your UO mail address (visit <a href="http://uoprint.uoregon.edu/uo-addresses" target="_blank" title="How to Address UO Mail (link opens in new window)">How to Address UO Mail</a> for more info).'),
  '#required' => FALSE,
  );

  // Street Address 2
  $form['uobannerandfooter']['address']['address_street_2'] = array(
  '#title' => t('Street Address 2'),
  '#type' => 'textfield',
  '#maxlength' => 80,
  '#size' => 80,
  '#default_value' => (!empty($uobannerandfooter['address']['address_street_2']))
                  ? $uobannerandfooter['address']['address_street_2']
                  : '',
  '#description' => t('If you have a secondary street address, please enter it here. '),
  '#required' => FALSE,
  );

  // City
  $form['uobannerandfooter']['address']['address_city'] = array(
  '#title' => t('City'),
  '#type' => 'textfield',
  '#maxlength' => 40,
  '#size' => 40,
  '#default_value' => (!empty($uobannerandfooter['address']['address_city']))
                  ? $uobannerandfooter['address']['address_city']
                  : '',
  '#required' => FALSE,
  );

  // U.S. states array
    $us_states_list = array(
     '' => "Choose State",
    'AL' => "Alabama",
    'AK' => "Alaska",
    'AZ' => "Arizona",
    'AR' => "Arkansas",
    'CA' => "California",
    'CO' => "Colorado",
    'CT' => "Connecticut",
    'DE' => "Delaware",
    'DC' => "District Of Columbia",
    'FL' => "Florida",
    'GA' => "Georgia",
    'HI' => "Hawaii",
    'ID' => "Idaho",
    'IL' => "Illinois",
    'IN' => "Indiana",
    'IA' => "Iowa",
    'KS' => "Kansas",
    'KY' => "Kentucky",
    'LA' => "Louisiana",
    'ME' => "Maine",
    'MD' => "Maryland",
    'MA' => "Massachusetts",
    'MI' => "Michigan",
    'MN' => "Minnesota",
    'MS' => "Mississippi",
    'MO' => "Missouri",
    'MT' => "Montana",
    'NE' => "Nebraska",
    'NV' => "Nevada",
    'NH' => "New Hampshire",
    'NJ' => "New Jersey",
    'NM' => "New Mexico",
    'NY' => "New York",
    'NC' => "North Carolina",
    'ND' => "North Dakota",
    'OH' => "Ohio",
    'OK' => "Oklahoma",
    'OR' => "Oregon",
    'PA' => "Pennsylvania",
    'RI' => "Rhode Island",
    'SC' => "South Carolina",
    'SD' => "South Dakota",
    'TN' => "Tennessee",
    'TX' => "Texas",
    'UT' => "Utah",
    'VT' => "Vermont",
    'VA' => "Virginia",
    'WA' => "Washington",
    'WV' => "West Virginia",
    'WI' => "Wisconsin",
    'WY' => "Wyoming"
    );

  $address_state = variable_get('address_state', $us_states_list);

  // State
  $form['uobannerandfooter']['address']['address_state'] = array(
  '#title' => t('State'),
  '#type' => 'select',
  '#options' => $us_states_list,
  '#default_value' => (!empty($uobannerandfooter['address']['address_state']))
                  ? $uobannerandfooter['address']['address_state']
                  : '',
  '#description' => t('Select your state from the dropdown.'),
  '#required' => FALSE,
  );

  // Zip Code
  $form['uobannerandfooter']['address']['address_zip'] = array(
  '#title' => t('Zip Code'),
  '#type' => 'textfield',
  '#maxlength' => 10,
  '#size' => 20,
  '#default_value' => (!empty($uobannerandfooter['address']['address_zip']))
                  ? $uobannerandfooter['address']['address_zip']
                  : '',
  '#description' => t('Expected format: <em>97403</em>.'),
  '#required' => FALSE,
  );

  // Office
  $form['uobannerandfooter']['address']['address_office'] = array(
  '#title' => t('Office'),
  '#type' => 'textfield',
  '#maxlength' => 40,
  '#size' => 40,
  '#default_value' => (!empty($uobannerandfooter['address']['address_office']))
                  ? $uobannerandfooter['address']['address_office']
                  : '',
  '#required' => FALSE,
  );

  // Google Maps URL
  $form['uobannerandfooter']['address']['googlemaps_url'] = array(
  '#title' => t('Google Maps URL'),
  '#type' => 'textfield',
  '#maxlength' => 80,
  '#size' => 80,
  '#default_value' => (!empty($uobannerandfooter['address']['googlemaps_url']))
                  ? drupal_strip_dangerous_protocols($uobannerandfooter['address']['googlemaps_url'])
                  : '',
  '#description' => t('This should be the URL for your location on <a href="https://maps.google.com" target="_blank">Google Maps</a>. If specified, the address will link to this URL.'),
  '#required' => FALSE,
  );

  // Contact Information (fieldset)

  $form['uobannerandfooter']['contact'] = array(
  '#type' => 'fieldset',
  '#title' => t('Contact Information'),
  '#description' => t('<p>In the Contact Information section, you can add your department’s name (which will automatically default to the title of your website), telephone and fax numbers, email address and a link to your contact us page. You can enter up to two telephone numbers in the footer.</p><p>The telephone number should be entered with the area code and use a hyphen to break up the numbers. </p><p>To enter the link to your contact us page, use a relative link (only the information after uoregon.edu) in the Contact Form URL box. For Digital Communications, the Contact Us page is located at http://digital.uoregon.edu/about-us, so in the Contact Form URL box, enter /about-us.</p><p><a href="http://digital.uoregon.edu/content/formatting-footer#Contact Information" target="_blank">Additional Help</a>'),
  '#weight' => -8,
  '#collapsible' => TRUE,
  '#collapsed' => TRUE,
  );

  // Organization Name
  $form['uobannerandfooter']['contact']['org_name'] = array(
  '#title' => t('Organization Name'),
  '#type' => 'textfield',
  '#maxlength' => 60,
  '#size' => 60,
  '#default_value' => (!empty($uobannerandfooter['contact']['org_name']))
                  ? $uobannerandfooter['contact']['org_name']
                  : variable_get('site_name', ''),
  '#description' => t('This should be the official name of your organization. Defaults to your website name.'),
  '#required' => FALSE,
  );

  // Phone Number
  $form['uobannerandfooter']['contact']['phone'] = array(
  '#title' => t('Phone Number'),
  '#type' => 'textfield',
  '#maxlength' => 20,
  '#size' => 20,
  '#default_value' => (!empty($uobannerandfooter['contact']['phone']))
                  ? $uobannerandfooter['contact']['phone']
                  : '',
  '#description' => t('This should be the primary contact phone number for this site.<br /><br />Example: <em>541-123-4567</em>'),
  '#required' => FALSE,
  );

   // Phone Number 2
  $form['uobannerandfooter']['contact']['phone_2'] = array(
  '#title' => t('Phone Number 2'),
  '#type' => 'textfield',
  '#maxlength' => 20,
  '#size' => 20,
  '#default_value' => (!empty($uobannerandfooter['contact']['phone_2']))
                  ? $uobannerandfooter['contact']['phone_2']
                  : '',
  '#description' => t('This should be the alternate contact phone number for this site.<br /><br />Example: <em>800-123-1234</em>'),
  '#required' => FALSE,
  );

    // Fax Number
  $form['uobannerandfooter']['contact']['fax'] = array(
  '#title' => t('Fax Number'),
  '#type' => 'textfield',
  '#maxlength' => 20,
  '#size' => 20,
  '#default_value' => (!empty($uobannerandfooter['contact']['fax']))
                  ? $uobannerandfooter['contact']['fax']
                  : '',
  '#description' => t('This should be the primary fax number for this site.<br /><br />Example: <em>541-346-2073</em>'),
  '#required' => FALSE,
  );

  // Email Address
  $form['uobannerandfooter']['contact']['email'] = array(
  '#title' => t('Email Address'),
  '#type' => 'textfield',
  '#maxlength' => 30,
  '#size' => 30,
  '#default_value' => (!empty($uobannerandfooter['contact']['email']))
                  ? $uobannerandfooter['contact']['email']
                  : '',
  '#description' => t('This should be the primary email address for this web site.'),
  '#required' => FALSE,
  );

  // Contact URL
  $form['uobannerandfooter']['contact']['contact_url'] = array(
  '#title' => t('Contact Form URL'),
  '#type' => 'textfield',
  '#maxlength' => 80,
  '#size' => 80,
  '#default_value' => (!empty($uobannerandfooter['contact']['contact_url']))
                  ? drupal_strip_dangerous_protocols($uobannerandfooter['contact']['contact_url'])
                  : '',
  '#description' => t('This should be an absolute (http://mysite.com/contact) or relative (/contact) link to your website\'s contact form.'),
  '#required' => FALSE,
  );

  // Social Media Links (fieldset)

  $form['uobannerandfooter']['social'] = array(
  '#type' => 'fieldset',
  '#title' => t('Social Media Links'),
  '#description' => t('<p>In the Social Media Links section, enter the web address for the social media accounts associated with your department in the corresponding boxes. There is the ability to add one account each for Facebook, Twitter, YouTube, Instagram, LinkedIn, Pinterest, and an RSS Feed. This will automatically add the icon for that account to the footer with a link to the corresponding account.</p><p><a href="http://digital.uoregon.edu/content/formatting-footer#Social Media Links" target="_blank">Additional Help</a>'),
  '#weight' => -7,
  '#collapsible' => TRUE,
  '#collapsed' => TRUE,
  );

  // Facebook URL
  $form['uobannerandfooter']['social']['facebook_url'] = array(
  '#title' => t('Facebook URL'),
  '#type' => 'textfield',
  '#maxlength' => 80,
  '#size' => 80,
  '#default_value' => (!empty($uobannerandfooter['social']['facebook_url']))
                  ? drupal_strip_dangerous_protocols($uobannerandfooter['social']['facebook_url'])
                  : '',
  '#description' => t('This should be the URL to your Facebook page.'),
  '#required' => FALSE,
  );

  // Twitter URL
  $form['uobannerandfooter']['social']['twitter_url'] = array(
  '#title' => t('Twitter URL'),
  '#type' => 'textfield',
  '#maxlength' => 80,
  '#size' => 80,
  '#default_value' => (!empty($uobannerandfooter['social']['twitter_url']))
                  ? drupal_strip_dangerous_protocols($uobannerandfooter['social']['twitter_url'])
                  : '',
  '#description' => t('This should be URL to your Twitter page.'),
  '#required' => FALSE,
  );

  // YouTube URL
  $form['uobannerandfooter']['social']['youtube_url'] = array(
  '#title' => t('YouTube URL'),
  '#type' => 'textfield',
  '#maxlength' => 80,
  '#size' => 80,
  '#default_value' => (!empty($uobannerandfooter['social']['youtube_url']))
                  ? drupal_strip_dangerous_protocols($uobannerandfooter['social']['youtube_url'])
                  : '',
  '#description' => t('This should be URL to your YouTube channel.'),
  '#required' => FALSE,
  );

  // Instagram URL
  $form['uobannerandfooter']['social']['instagram_url'] = array(
  '#title' => t('Instagram URL'),
  '#type' => 'textfield',
  '#maxlength' => 80,
  '#size' => 80,
  '#default_value' => (!empty($uobannerandfooter['social']['instagram_url']))
                  ? drupal_strip_dangerous_protocols($uobannerandfooter['social']['instagram_url'])
                  : '',
  '#description' => t('This should be the URL to your Instagram page.'),
  '#required' => FALSE,
  );

  // LinkedIn URL
  $form['uobannerandfooter']['social']['linkedin_url'] = array(
  '#title' => t('LinkedIn URL'),
  '#type' => 'textfield',
  '#maxlength' => 80,
  '#size' => 80,
  '#default_value' => (!empty($uobannerandfooter['social']['linkedin_url']))
                  ? drupal_strip_dangerous_protocols($uobannerandfooter['social']['linkedin_url'])
                  : '',
  '#description' => t('This should be the URL to your LinkedIn page.'),
  '#required' => FALSE,
  );

  // Pinterest URL
  $form['uobannerandfooter']['social']['pinterest_url'] = array(
  '#title' => t('Pinterest URL'),
  '#type' => 'textfield',
  '#maxlength' => 80,
  '#size' => 80,
  '#default_value' => (!empty($uobannerandfooter['social']['pinterest_url']))
                  ? drupal_strip_dangerous_protocols($uobannerandfooter['social']['pinterest_url'])
                  : '',
  '#description' => t('This should be the URL to your Pinterest page.'),
  '#required' => FALSE,
  );


  // RSS URL
  $form['uobannerandfooter']['social']['rss_url'] = array(
  '#title' => t('RSS Feed URL'),
  '#type' => 'textfield',
  '#maxlength' => 80,
  '#size' => 80,
  '#default_value' => (!empty($uobannerandfooter['social']['rss_url']))
                  ? drupal_strip_dangerous_protocols($uobannerandfooter['social']['rss_url'])
                  : '',
  '#description' => t('This should be the URL to your RSS feed.'),
  '#required' => FALSE,
  );

  return system_settings_form($form);
}


?>
