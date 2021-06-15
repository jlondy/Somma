# CSCI 4166 Project (Somma)

Hosted with netlify at: https://hardcore-borg-b27f95.netlify.app/

## Available Scripts

In the project directory, you can run:

### 'npm start'

Runs the app in the localhost
Open [http://localhost:3000]to view it in the browser.

## How to run and use Somma

Download dataset from https://www.kaggle.com/zynicide/wine-reviews then in src folder create a folder called dataset and put the csv inside.

I have attached a short demostration that explains the steps below if you'd rather watch and listen instead of reading the steps below.

1. Run the available script above in terminal while in the 'my-app' directory.
2. Open [http://localhost:3000].
3. Start page is the landing page used to explain Somma.
4. Click 'View Data' to redirect to the dashboard page.

On the dashboard page you must select all filters to begin looking at data. 
Filters are on the right hand-side of the dashboard.
Once all filters are selected click 'Apply Filters'.

The program will update and show message on the left hand-side that either says 
'0 SELECTED WINES' OR 'SOMENUMBER SELECTED WINES'.
If the message says '0 SELECTED WINES' change filters to get another selection.
Else the 'Price Amount', 'Rank Amount', and wine selection should all be visible.

'Price Amount' will allow you to hover and see the amount of wines availble for all prices.
'Rank Amount' will allow you to hpver and see the amount of wines availble for all ranks.

In the wines selection you can see all the wines in that selection. 
Hovering will show the wine name and country.
Clicking will redirect to another wine page.

5. Click a wine glass to redirect to the wine page.

The wine page shows all the information about a wine.

6. Click 'Winery' at the bottom.

The winery page will show a bunch of lines, the wineries average rank of all their wines, and the wineries highest and lowest priced wines.
Hovering on a line will show the wine name, price, and rank.

7. Click 'Taster' at the bottom.

The taster page will show all the tasters. 
Drag and drop into the circle to compare the tasters with the taster that ranked the wine glass chosen.
Drag and drop out of the circle to reselect.
Click the 'Reset if things get messy!' link to reset tasters circles.

8. Click 'View Data' to redirect back to the dashboard page.
