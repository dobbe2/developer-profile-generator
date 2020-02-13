# developer-profile-generator
A command-line application that dynamically generates a PDF profile from a GitHub username and choice of color.


![](https://i.imgur.com/SRdGM1P.png)
![](https://i.imgur.com/D6BUVWs.png)

## Features

The PDF will be populated with the following:

* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following


## Bugs

* I am unable to get the write to PDF to work.  I keep getting an error about a timeout from electron.  I have unistalled and reinstalled all node modules that have to do with electron and electron-html-to.  

![](https://i.imgur.com/eBf3Jsm.png)

I was unable to get the "GutHub Stars" to work.  I am sure I can figure this out with a little more time.


## NPM's and Libraries Used:

* GitHub API
* fs
* axios
* inquirer
* electron-html-to
* fontAwesome
* google Fonts
