# MyPantryPal
Mobile app to keep track of your grocery list via barcode

## What is
This project is meant to create a mobile app (hybrid app with Ionic in this case) which can be used by a person to create a virtual Pantry and keep tracks of the quantity of the elements inside it.  
Other functionalities are:
- Barcode scanning through the smartphone camera instead of typing b hand ever time
- Acces to a shared database of products searchable by barcode from where the user can clone product instead of creating them from scratch every time
- Creation of Grcery Lists in which add the products and to be used as references when shopping
- Evasion of completed Grocery Lists, moving the products inside to the Pantry 
- Get suggestion on product that are running low on quantity and "hot" Grocery Lists with a lot of products inside them

## How to
Before dong anything you need to install all the dependencies, even the development ones:
``` console
usr@computer:~/MyPantryPal$ yarn install --save-dev // alternatively npm install
```
To start the development servers simply run the first command, alternatively you can build a production React build and create the mobile app with the second command.  
Please note a iOS conterpart hasn't been made since I haven't been able to test it, but should be specular to the Android one
``` console
usr@computer:~/MyPantryPal$ yarn start
usr@computer:~/MyPantryPal$ yarn android // This will open Android Studio upon completion
```
Once Android Studio has been opened the rest of the procedure is guided by Android Studio itself (in case of errors of any kind) and is pretty much standardized to the process of any native app, simply build the source code generated and falsh it on the emulated or physical smartphone.

## Credits
This project was made by [me](https://github.com/its-hmny) as an assignment for the Mobile app development course at University of Bologna.  
Special thanks to [Alessia Garbarino](https://www.behance.net/alessiagarbarino/) for designing the logo and other assets.