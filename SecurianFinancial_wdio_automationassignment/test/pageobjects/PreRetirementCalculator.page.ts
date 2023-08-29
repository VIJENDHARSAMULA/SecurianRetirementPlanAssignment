import { ChainablePromiseElement } from "webdriverio";

import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PreRetirementCalculatorPage extends Page {
  /**
   *  selectors using getter methods
   */
  public get inputCurrentAge() {
    return $("#current-age");
  }

  public get inputRetirementAge() {
    return $("#retirement-age");
  }

  public get inputCurrentAnnulaIncome() {
    return $("#current-income");
  }

  public get inputSpouseIncome() {
    return $("#spouse-income");
  }

  public get inputCurrentRetirementSavings() {
    return $("#current-total-savings");
  }

  public get inputYearlySavingsPercentage() {
    return $("#current-annual-savings");
  }

  public get inputYearlySavingsIncreaseRatePercentage() {
    return $("#savings-increase-rate");
  }

  public get inputIncludeSocialSecurityIncome() {
    return $('label[for="yes-social-benefits"]');
  }

  public get inputExcludeSocialSecurityIncome() {
    return $('label[for="no-social-benefits"]');
  }

  public get inputSingleMaritalStatus() {
    return $('label[for="single"]');
  }

  public get inputMarriedMaritalStatus() {
    return $('label[for="married"]');
  }

  public get inputSecurityOverrideAmount() {
    return $("#social-security-override");
  }

  public get linkAdjustDefaultValues() {
    return $('li a[data-toggle="modal"][data-target="#default-values-modal"]');
  }

  public get inputAdditionalIncome() {
    return $("#additional-income");
  }

  public get inputRetirementDuration() {
    return $("#retirement-duration");
  }

  public get inputIncludeInflation() {
    return $('label[for="include-inflation"]');
  }

  public get inputExcludeInflation() {
    return $('label[for="exclude-inflation"]');
  }

  public get inputEveryYearAnnualIncomeForRetirement() {
    return $("#retirement-annual-income");
  }

  public get inputPreretirementInvestmentReturn() {
    return $("#pre-retirement-roi");
  }

  public get inputPostretirementInvestmentReturn() {
    return $("#post-retirement-roi");
  }

  public get btnCalculatePlan() {
    return $("button.dsg-btn-primary.btn-block[data-tag-id='submit']");
  }

  public get labelResultsMessage() {
    return $("#result-message");
  }

  public get saveDefaultValues() {
    return $(
      'button.dsg-btn-primary.btn-block[onclick="savePersonalizedValues();"]'
    );
  }

  public get mandatoryFieldsAleratMessage () {
    return $('#calculator-input-alert-desc');
  }

  public get currentAgeAlertMessage () {
    return $('#invalid-current-age-error')
  }

  public get retirementAgeAlertMessage () {
    return $('#invalid-retirement-age-error')
  }

  public get currentAnnualIncomeAlertMessage () {
    return $('#invalid-current-income-error')
  }

  public get currentSavingsAlertMessage () {
    return $('#invalid-current-total-savings-error')
  }
   
  public get yearlySavingsPercentageAlertMessage () {
    return $('#invalid-current-annual-savings-error')
  }

  public get yearlySavingsPercentageIncreaseRateAlertMessage () {
    return $('#invalid-savings-increase-rate-error')
  }
  

  async enterCurrentAge(currentAge: number): Promise<void> {
    await this.inputCurrentAge.setValue(currentAge);
  }

  async enterRetirementAge(retirementAge: number): Promise<void> {
    await this.inputRetirementAge.setValue(retirementAge);
  }

  async enterCurrentAnnualIncome(annualIncome: number): Promise<void> {
    (await this.inputCurrentAnnulaIncome).scrollIntoView();
    (await this.inputCurrentAnnulaIncome).click();
    await this.inputCurrentAnnulaIncome.setValue(annualIncome);
  }

  async enterSpouseAnnualIncome(spouseIncome: number): Promise<void> {
    
    (await this.inputSpouseIncome).click();
    await this.inputSpouseIncome.setValue(spouseIncome);
  }

  async enterRetirementCurrentSavings(currentBalance: number): Promise<void> {
    
    (await this.inputCurrentRetirementSavings).click();
    await this.inputCurrentRetirementSavings.setValue(currentBalance);
  }

  async enterYearlySavingsRate(yearlySavingsRate: number): Promise<void> {
    (await this.inputYearlySavingsPercentage).click();
    await this.inputYearlySavingsPercentage.setValue(yearlySavingsRate);
  }

  async enterYearlySavingsIncrementRate(
    yearlySavingsIncrementRate: number
  ): Promise<void> {
    (await this.inputYearlySavingsIncreaseRatePercentage).click();
    await this.inputYearlySavingsIncreaseRatePercentage.setValue(
      yearlySavingsIncrementRate
    );
  }

  //If consent is passed as true then yes will be clicked on and if false then no will be clicked on
  async selectSocialSecurityIncome(consent: Boolean): Promise<void> {
    if (consent) {
      (await this.inputIncludeSocialSecurityIncome).scrollIntoView();
      await this.inputIncludeSocialSecurityIncome.click();
    } else {
      (await this.inputExcludeSocialSecurityIncome).scrollIntoView();
      await this.inputExcludeSocialSecurityIncome.click();
    }
  }

  async enterSecurityOverrideAmount(securityAmount: number): Promise<void> {
    (await this.inputSecurityOverrideAmount).setValue(securityAmount);
  }

  async enterAdditionalIncome(additionalIncome: number): Promise<void> {
    await (await this.inputAdditionalIncome).click();
    (await this.inputAdditionalIncome).setValue(additionalIncome);
  }

  async enterRetirementDuration(
    RetirementDuration: number
  ): Promise<void> {
    await (await this.inputRetirementDuration).click();
    (await this.inputRetirementDuration).setValue(RetirementDuration);
  }
  async enterEveryYearAnnualIncomeForRetirement(
    EveryYearAnnualIncomeForRetirement: number
  ): Promise<void> {
    await (await this.inputEveryYearAnnualIncomeForRetirement).click();
    (await this.inputEveryYearAnnualIncomeForRetirement).setValue(
      EveryYearAnnualIncomeForRetirement
    );
  }

  async enterPreretirementInvestmentReturn(
    PreretirementInvestmentReturn: number
  ): Promise<void> {
    await (await this.inputPreretirementInvestmentReturn).click();
    (await this.inputPreretirementInvestmentReturn).setValue(
      PreretirementInvestmentReturn
    );
  }

  async enterPostretirementInvestmentReturn(
    PostretirementInvestmentReturn: number
  ): Promise<void> {
    await (await this.inputPostretirementInvestmentReturn).click();
    (await this.inputPostretirementInvestmentReturn).setValue(
      PostretirementInvestmentReturn
    );
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  public open() {
    return super.open("insights-tools/retirement-calculator.html");
  }
}

export default new PreRetirementCalculatorPage();
