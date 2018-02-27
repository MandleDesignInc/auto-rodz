# AutoRodz
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.


## NOTES

1. This application is complete to the the point of successfully running a test transaction in the live Authorize.net environment. However, very 
little testing has been done beyond that. As a result, some bugs are likely to appear. Additionally, several parts of the app were only developed
to the point necessary for the app to 'work'. These parts will likely need attention at some point. I'll cover these in more detail below. 

2. In contrast with other Mandle apps built on Angular, this one relies minimally on ModX. The content for the home page, departments page, contact page,
and header/footer are all coming from ModX. The brands page and everything related to the store (products page triggered by search, cart/checkout) is 
provided by a custom REST API built with [Jersey 2.26](https://jersey.github.io/), and written in [Java](https://docs.oracle.com/javase/tutorial/). 
This API is a separate application running in a [Apache Tomcat 8.5](http://tomcat.apache.org/tomcat-8.5-doc/index.html) container on bluemandle2.
The source code for the API will be uploaded here in a separate repo. See that repo for more information on the API. 

## Project Overview

The structure of the app is pretty straight-forward. Rather than a review of the whole structure, I'll focus on key points that might
not be obvious from looking at the source code. 

### Modules

#### Content or Page Modules

Like other Mandle Angular apps, plain content modules are structured to represent a 'Page' in ModX thinking.  

#### Convenience Modules

There are also modules like app-bar, app-footer, and custom-pipes. These exist to separate functionality and to try and keep content or 'ModX Page' modules 
for getting too complicated.

#### Store Module

This is where most of the store related features will be. Product/Search Result pages, checkout, payment etc. The structure is a little
odd here due to some late stage modification to the checkout flow. So the naming is a little weird. The CartComponent is the parent 
to ReviewCartComponent, CheckoutComponent, and PaymentComponent. Originally, there were multiple views for reviewing the cart contents.
These were nested to simplify things a bit. So clicking the cart icon in the upper right takes you to the CartComponent, which contains 
a [mat-stepper](https://material.angular.io/components/stepper/overview). The first and default view of the Stepper is the CartReviewComponent
. This serves as both the cart view, and the first step in the checkout flow if the user is ready. 

##### PaymentComponent - communicator.html - Authorize.net Accept Hosted
Note that the payment component incorporates [Authorize.net Accept Hosted](https://developer.authorize.net/api/reference/features/accept_hosted.html) to 
reduce PCI compliance requirements. The PaymentComponent displays the hosted form. While the parent component, CartComponent, listens for 
events from Authorize.net. Events from Authorize.net are handled by communicator.html. communicator.html listens for messages from 
Authorize.net, and then dispatches them as custom events to the Angular application. The custom events are picked up the CartComponent. 
NOTE: communicator.html must be in the apps root directory, alongside the compiled source files, and .htaccess. 


### Areas that require or might require further attention

1. The [product list](https://github.com/MandleDesignInc/auto-rodz/tree/master/src/app/store/products) currently displays only in response to a 
search. This is by design. The search function is at the root level of the app, so any view that needs to display products can do so by running a 
query. If you manually (in the url bar) load autorodz.com/products, you'll get a blank page since there was no query to the backend API. This could be 
eliminated by removing the route to 'products' and nesting the view somewhere. It was left as a route with the intention of building a default page. 
Which could display featured products or something like that. This or any other page involving a filtered list of products can be built to use the 
existing search feature. The [BrandsComponent](https://github.com/RyanPotsander/auto-rodz/tree/master/src/app/brands) does this now. It routes to
[ProductsComponent](https://github.com/MandleDesignInc/auto-rodz/tree/master/src/app/store/products) when a brand name is clicked by performing a 
search for the clicked brand. 

2. The order confirmation page that appears after payment only displays the order number. Intention was to create a downloadable receipt for the user.
And also expose access for the client to change the message. All of the order data should be available in this component, so adding additional 
order data to the view should be straight-forward. 

3. Order notification emails. I do not have necessary access to Mandrill to setup notifications. Due to time restrictions, I was not able to wait 
to handle getting the needed access to complete this. So the app doesn't trigger any email notifications at this time. Not wanting to leave you guys hanging, I went ahead and built functionality to pull from a 
list of emails stored in a database table. The table is currently empty. Upon inserting email addresses, they should receive notification when an 
order is placed. It isn't tested, so bugs may be present. This was a best effort solution. See the [API](https://github.com/MandleDesignInc/AutorodzAPI)
for more on adding emails. 

4. Sales tax. We discussed adding sales tax for Iowa only. Which is how it is setup currently. All orders shipped to IA should charge 6% sales 
tax. Outside of IA, no tax is charged. It occurred to me that this might be somewhat more complicated than originally thought, considering sales tax 
varies by location in IA. After a bit of research, it was clear that confirming correct tax information was beyond the scope of what I could do 
given the time restriction I am faced with. 

From the tiny amount of research I did, it appears to me that sales tax should include local option tax when the order is shipped 
to a location where local option tax exists (e.g. Davenport adds 1% local option tax, making it 7%). However, I am far from an expert on this, and 
am unable to research this any further at this time. 

Again, not wanting to leave you guys hanging, here's how it works as of now:

I removed the hard coded sales tax calculations from the app and created database tables to store tax information. One for State tax, and one for Local Option tax. 
The backend API checks the database tables and applies tax based on that information. I added IA-6% and Davenport-1% to the tables already. So right now, 
all orders shipped to IA will be charged state sales tax of 6%. Orders shipped to Davenport will be charged an extra 1% sales tax. Any other locations 
that charge local option tax will not be collected by the application until they are added to the database with the correct tax rate. See the 
[API](https://github.com/MandleDesignInc/AutorodzAPI) for more on adding tax data. 


Those are the primary things to be aware of. If I think of more, I will return and add them here as time allows. 


##The following was generated by Angular CLI 

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


