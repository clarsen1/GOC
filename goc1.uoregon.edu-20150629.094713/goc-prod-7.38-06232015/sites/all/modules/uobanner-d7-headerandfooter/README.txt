// $Id$

CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Installation


INTRODUCTION
------------

Current Maintainers: 
Paul Kozik <pkozik@uoregon.edu>
Ed Parker <edparker@uoregon.edu>

Contributors:
Matt Coughlin <mcoughli@uoregon.edu>
Jesse Sedwick <jsedwick@uoregon.edu>
Jason Huebsch <jasonh@uoregon.edu>
Daniel Mundra <dmundra@uoregon.edu>

Configuration menu path:
Configuration->User interface->UO Banner and Footer settings

The purpose of this module is to provide UO Drupal developers with the ability to activate a standard UO Banner and Footer on their sites. 
This module supports most themes and is designed to be responsive.  This module does not include a search field.

If desired, developers can display a sub-footer above the footer.  This sub-footer can be populated with various information, including: street address, a link to Google Maps, social media links, a link to the request information form, phone number and email.  Developers can also set a max pixel width.  The max pixel width is intended to allow developers the ability to match the width of the banner and footer assets with layout dimensions.  A custom content area is also available to developers.  The custom content field conforms to your global html filter settings.

The sub-footer can be configured at: /admin/config/user-interface/uobannerandfooter .  Alternatively, you can navigate to Configuration > UO Banner and Footer (within the User Interface section).

This module also includes UO branded Favicons for web browsers and Touch Icons for iOS and Android mobile operating systems.  Basic support for the MS Tile is in development.  To use the UO favicon, edit your theme settings 
(Appearance > Settings) to disable the default favicon, but do not specify a replacement, as the module will add the UO logo 
automatically.


INSTALLATION
------------

1. Install as usual, see http://drupal.org/node/70151 for further information.
