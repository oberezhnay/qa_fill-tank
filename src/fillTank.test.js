'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be a function', () => {
    expect(typeof fillTank).toBe('function');
  });

  it('should fill the tank to full capacity if no amount is specified', () => {
    const customer = createNewCustomer();

    fillTank(customer, 50);
    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it('should fill the tank how it possible if not enough money', () => {
    const customer = createNewCustomer();
    const fuelPrice = 100;
    const customerMoneyBeforePay = customer.money;
    const customerFuelRemainsBeforePay = customer.vehicle.fuelRemains;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(
      customerFuelRemainsBeforePay + customerMoneyBeforePay / fuelPrice,
    );
  });

  it('should fill the possible tank value', () => {
    const customer = createNewCustomer();

    fillTank(customer, 50, 100);
    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it('should not fill the fuel less then 2 liters', () => {
    const customer = createNewCustomer();
    const customerFuelRemainsBeforePay = customer.vehicle.fuelRemains;

    fillTank(customer, 100, 1);
    expect(customer.vehicle.fuelRemains).toBe(customerFuelRemainsBeforePay);
  });

  it('should round fuelRemains', () => {
    const customer = createNewCustomer();

    fillTank(customer, 50, 12.78);
    expect(customer.vehicle.fuelRemains).toBe(20.7);
  });

  it('should round fuelRemains to one decimal place', () => {
    const customer = createNewCustomer();

    fillTank(customer, 50, 12.7);
    expect(customer.vehicle.fuelRemains).toBe(20.7);
  });

  it('should round price', () => {
    const customer = createNewCustomer();

    fillTank(customer, 2.345, 2.1);
    expect(customer.money).toBe(2995.08);
  });
});

function createNewCustomer() {
  return {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  }
}
