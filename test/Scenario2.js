var pkg = JavaImporter(org.openqa.selenium); //WebDriver classes
var support_ui = JavaImporter(org.openqa.selenium.support.ui.WebDriverWait); //WebDriver classes
var wait = new support_ui.WebDriverWait(WDS.browser, 5000);
var conditions = org.openqa.selenium.support.ui.ExpectedConditions;

WDS.sampleResult.sampleStart(); //captures sampler's start time
WDS.sampleResult.getLatency();
WDS.browser.get('http://localhost:'+ WDS.args[0]);

/* Home Page */
var button = WDS.browser.findElement(pkg.By.id('universities-page-link')); //Find Search button
button.click(); //Click Search Button

/* Universities Page */
wait.until(conditions.presenceOfElementLocated(pkg.By.id('search-button')));
var searchBar = WDS.browser.findElement(pkg.By.id('search'));
searchBar.sendKeys(['University of Virginia']);
var searchButton = WDS.browser.findElement(pkg.By.id('search-button'));
searchButton.click();
var virginiaLink = WDS.browser.findElement(pkg.By.id('90196'));
virginiaLink.click();

/* University Page */
wait.until(conditions.presenceOfElementLocated(pkg.By.id('CS')));
var departmentLink = WDS.browser.findElement(pkg.By.id("CS"));
departmentLink.click();

/* Department Page */
wait.until(conditions.presenceOfElementLocated(pkg.By.id('CS 4414')));
var courseLink = WDS.browser.findElement(pkg.By.id("CS 4414"));
courseLink.click();

/* Course Page */
wait.until(conditions.presenceOfElementLocated(pkg.By.id('33771')));
var textbookLink = WDS.browser.findElement(pkg.By.id("33771"));
textbookLink.click();

/* Textbook Page */
wait.until(conditions.presenceOfElementLocated(pkg.By.id('order-button')));
var orderLink = WDS.browser.findElement(pkg.By.id("order-button"));
orderLink.click();

/* Order Textbook */
wait.until(conditions.presenceOfElementLocated(pkg.By.id('order_email')));
var email = WDS.browser.findElement(pkg.By.id("order_email"));
email.sendKeys(['dummy@email.com']);
var createOrder = WDS.browser.findElement(pkg.By.id("order_create"));
createOrder.click();

WDS.sampleResult.sampleEnd();
