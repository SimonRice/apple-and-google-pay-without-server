# Apple & Google Pay Without a Server
## Example Code

This repository gives a sample of a project using Google and Apple pay without any formal backend or web hosting costs.

### Getting Started

First of all, you'll need to set up accounts with these services:

* Stripe - payment processing.
* Webtask - this is where you will host your "backend" code.
* Anywhere where you can host your frontend code - even GitHub pages will do the job!
* If your frontend code doesn't do HTTPS, get a certificate from LetsEncrypt or put a CDN that does supports it such as Cloudflare in front of your assets.  If you're just trying this out locally, give ngrok a spin.

Finally, all public and secret keys used throughout this repository are completely randomised.  Please replace them with your own test keys from Stripe to get things working for you.

### Carrying On

This is split into two folders:

* Client - this is your sample static assets to get up & running with your test project.
* Webtask - this code is to be hosted on webtasks.

Each folder has a separate readme, where you can carry on with the procedure.  Alternatively, feel free to read my blog post on the subject, which gives an end to end tutorial corresponding to this repository.
