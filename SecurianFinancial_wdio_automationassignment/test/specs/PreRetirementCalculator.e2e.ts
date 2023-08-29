import RetirementCalculatorPage from "../pageobjects/PreRetirementCalculator.page.js";
import appData from "../TestData/TestData.json" assert { type: "json" };

describe("Pre-retirement calculator", () => {
  /**
   * Opening the securian retirement plan url
   * and maximising the window before every test
   */
  beforeEach(async () => {
    await RetirementCalculatorPage.open();
    await browser.maximizeWindow();
    expect(await browser.getTitle()).toEqual(
      appData.staticmessages.planhomepagetitle
    );
  });

  it("User should be able to submit form with all fields filled in", async () => {
    /**
     * Entering all the fileds in the form
     */
    await RetirementCalculatorPage.enterCurrentAge(
      appData.retirementplandata.currentage
    );

    await RetirementCalculatorPage.enterRetirementAge(
      appData.retirementplandata.retirementage
    );

    await RetirementCalculatorPage.enterCurrentAnnualIncome(
      appData.retirementplandata.annualincome
    );

    await RetirementCalculatorPage.enterSpouseAnnualIncome(
      appData.retirementplandata.spouseincome
    );

    await RetirementCalculatorPage.enterRetirementCurrentSavings(
      appData.retirementplandata.currentsavingsbalance
    );

    await RetirementCalculatorPage.enterYearlySavingsRate(
      appData.retirementplandata.yearlysavings
    );

    await RetirementCalculatorPage.enterYearlySavingsIncrementRate(
      appData.retirementplandata.yearlyincrementrate
    );

    /**
     * Making sure all the Socical Security fields are not displayed after selecting no
     */
    await RetirementCalculatorPage.selectSocialSecurityIncome(false);
    expect(
      RetirementCalculatorPage.inputSingleMaritalStatus
    ).not.toBeExisting();
    expect(
      RetirementCalculatorPage.inputMarriedMaritalStatus
    ).not.toBeExisting();
    expect(
      RetirementCalculatorPage.enterSecurityOverrideAmount
    ).not.toBeExisting();

    await RetirementCalculatorPage.btnCalculatePlan.click();

    await (
      await RetirementCalculatorPage.labelResultsMessage
    ).waitForDisplayed({ timeout: 5000 });

  
    /**
     * Scorlling up the page to capture the results message
     */
    await browser.execute(() => {
      window.scrollTo(0, 0);
    });

    /**
     * Cappturing the screeshot after the form submission
     */
    await browser.saveScreenshot(
      `./test/screenshots/${appData.screenshotnames.formsubmissionwithallfields}.png`
    );

    /**
     * Ensuring Results messages is displayed after form submission
     */
    expect(await RetirementCalculatorPage.labelResultsMessage).toBeExisting();
  });

  it("User should be able to submit form with all required fields filled in", async () => {
    /**
     * Submitting the form without entering the the mandatory fileds and ensuring the alert message is displayed
     */
    await RetirementCalculatorPage.btnCalculatePlan.click();

    expect(
      RetirementCalculatorPage.mandatoryFieldsAleratMessage
    ).toBeExisting();

    /**
     * Capturing the mandatory fields error message screenshot
     */
    await browser.saveScreenshot(
      `./test/screenshots/${appData.screenshotnames.mandatoryfiledserrormessage}.png`
    );

    /**
     * Entering all the mandatory fields
     */
    await RetirementCalculatorPage.enterCurrentAge(
      appData.retirementplandata.currentage
    );

    await RetirementCalculatorPage.enterRetirementAge(
      appData.retirementplandata.retirementage
    );

    await RetirementCalculatorPage.enterCurrentAnnualIncome(
      appData.retirementplandata.annualincome
    );

    await RetirementCalculatorPage.enterRetirementCurrentSavings(
      appData.retirementplandata.currentsavingsbalance
    );

    await RetirementCalculatorPage.enterYearlySavingsRate(
      appData.retirementplandata.yearlysavings
    );

    await RetirementCalculatorPage.enterYearlySavingsIncrementRate(
      appData.retirementplandata.yearlyincrementrate
    );

    await browser.saveScreenshot(
      `./test/screenshots/${appData.screenshotnames.nonrequiredfield}.png`
    );

    await RetirementCalculatorPage.btnCalculatePlan.click();

    /*
     * Making sure no mandatory fields are missed and ensuring alert messages are displayed
     */
       expect((RetirementCalculatorPage.currentAgeAlertMessage).waitForExist({ timeout: 500,reverse:true, interval: 0 })).not.toBeDisabled();
       expect(RetirementCalculatorPage.retirementAgeAlertMessage.waitForExist({ timeout: 1,reverse:true, interval: 0 })).not.toBeDisabled();
       expect(RetirementCalculatorPage.currentAnnualIncomeAlertMessage.waitForExist({ timeout: 1,reverse:true, interval: 0 })).not.toBeDisabled();
       expect(RetirementCalculatorPage.currentSavingsAlertMessage.waitForExist({ timeout: 1,reverse:true, interval: 0 })).not.toBeDisabled();
       expect(RetirementCalculatorPage.yearlySavingsPercentageAlertMessage.waitForExist({ timeout: 1,reverse:true, interval: 0 })).not.toBeDisabled();
       expect(RetirementCalculatorPage.yearlySavingsPercentageIncreaseRateAlertMessage.waitForExist({ timeout: 1,reverse:true, interval: 0 })).not.toBeDisabled();



    /**
     * Wait time for results to be calculated
     */
    await (
      await RetirementCalculatorPage.labelResultsMessage
    ).waitForDisplayed({ timeout: 5000 });


    /**
     * Scorlling up the page to capture the results message
     */
    await browser.execute(() => {
      window.scrollTo(0, 0);
    });

    /**
     * Cappturing the screeshot after the form submission
     */
    await browser.saveScreenshot(
      `./test/screenshots/${appData.screenshotnames.formsubmissionwithrequiredfields}.png`
    );

    /**
     * Ensuring Results messages is displayed after form submission
     */

    expect(await RetirementCalculatorPage.labelResultsMessage).toBeExisting();
  });

  it("Additional Social Security fields should display/hide based on Social Security benefits toggle", async () => {
    /**
     * Entering all the fileds in the form
     */
    await RetirementCalculatorPage.enterCurrentAge(
      appData.retirementplandata.currentage
    );

    await RetirementCalculatorPage.enterRetirementAge(
      appData.retirementplandata.retirementage
    );

    await RetirementCalculatorPage.enterCurrentAnnualIncome(
      appData.retirementplandata.annualincome
    );

    await RetirementCalculatorPage.enterRetirementCurrentSavings(
      appData.retirementplandata.currentsavingsbalance
    );

    await RetirementCalculatorPage.enterYearlySavingsRate(
      appData.retirementplandata.yearlysavings
    );

    await RetirementCalculatorPage.enterYearlySavingsIncrementRate(
      appData.retirementplandata.yearlyincrementrate
    );

    /**
     * Making sure all the Socical Security fields are displayed after selecting yes
     */
    await RetirementCalculatorPage.selectSocialSecurityIncome(true);
    expect(RetirementCalculatorPage.inputSingleMaritalStatus).toBeExisting();
    expect(RetirementCalculatorPage.inputMarriedMaritalStatus).toBeExisting();
    expect(RetirementCalculatorPage.enterSecurityOverrideAmount).toBeExisting();

    await (
      await RetirementCalculatorPage.inputMarriedMaritalStatus
    ).waitForClickable();
    (await RetirementCalculatorPage.inputMarriedMaritalStatus).click();
    await RetirementCalculatorPage.enterSecurityOverrideAmount(
      appData.retirementplandata.securityoverrideamount
    );

    /**
     * Cappturing the screeshot after the Social Security Additional Fields
     */

    await browser.saveScreenshot(
      `./test/screenshots/${appData.screenshotnames.socialsecurityadditionalfileds}.png`
    );

    await RetirementCalculatorPage.btnCalculatePlan.click();

    /**
     * Ensuring results message is displayed
     */
    await (
      await RetirementCalculatorPage.labelResultsMessage
    ).waitForDisplayed({ timeout: 15000 });


    /**
     * Scorlling up the page to capture the results message
     */
    await browser.execute(() => {
      window.scrollTo(0, 0);
    });

    /**
     * Cappturing the screeshot after the form submission
     */

    await browser.saveScreenshot(
      `./test/screenshots/${appData.screenshotnames.fromsubmissionwithsociasecurityfields}.png`
    );

    /**
     * Ensuring Results messages is displayed after form submission
     */
    expect(await RetirementCalculatorPage.labelResultsMessage).toBeExisting();
  });

  6it("User should be able to update default calculator values", async () => {
    /**
     * Entering all the fileds in the form
     */
    await RetirementCalculatorPage.enterCurrentAge(
      appData.retirementplandata.currentage
    );

    await RetirementCalculatorPage.enterRetirementAge(
      appData.retirementplandata.retirementage
    );

    await RetirementCalculatorPage.enterCurrentAnnualIncome(
      appData.retirementplandata.annualincome
    );

    await RetirementCalculatorPage.enterRetirementCurrentSavings(
      appData.retirementplandata.currentsavingsbalance
    );

    await RetirementCalculatorPage.enterYearlySavingsRate(
      appData.retirementplandata.yearlysavings
    );

    await RetirementCalculatorPage.enterYearlySavingsIncrementRate(
      appData.retirementplandata.yearlyincrementrate
    );

    //Modifying the default values

    (await RetirementCalculatorPage.linkAdjustDefaultValues).click();

    await RetirementCalculatorPage.enterAdditionalIncome(
      appData.retirementplandata.additionalincome
    );

    await RetirementCalculatorPage.enterRetirementDuration(
      appData.retirementplandata.retirementduration
    );

    await RetirementCalculatorPage.enterEveryYearAnnualIncomeForRetirement(
      appData.retirementplandata.desiredfinalincome
    );

    await RetirementCalculatorPage.enterPreretirementInvestmentReturn(
      appData.retirementplandata.preinvestmentreturn
    );

    await RetirementCalculatorPage.enterPostretirementInvestmentReturn(
      appData.retirementplandata.postinvestmentreturn
    );

    /**
     * Cappturing the screeshot after the modified default values
     */
    await browser.saveScreenshot(
      `./test/screenshots/${appData.screenshotnames.modifieddefaultvalues}.png`
    );

    (await RetirementCalculatorPage.saveDefaultValues).click();

    await RetirementCalculatorPage.btnCalculatePlan.click();

    await (
      await RetirementCalculatorPage.labelResultsMessage
    ).waitForDisplayed({ timeout: 15000 });

 

    /**
     * Scorlling up the page to capture the results message
     */
    await browser.execute(() => {
      window.scrollTo(0, 0);
    });

    /**
     * Cappturing the screeshot after the form submission
     */

    await browser.saveScreenshot(
      `./test/screenshots/${appData.screenshotnames.formsubmissionwithdefaultvaluesmodified}.png`
    );

    expect(await RetirementCalculatorPage.labelResultsMessage).toBeExisting();
  });
});
