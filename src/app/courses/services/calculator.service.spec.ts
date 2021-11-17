import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {
    let loggerSpy: any;
    let calculator: CalculatorService;
    // beforeEach(() => {
    //     loggerSpy = jasmine.createSpyObj('LoggerServiceas', ['log']);
    //     calculator = new CalculatorService(loggerSpy);
    // });

    // Dependency Injection

    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                {provide: LoggerService, useValue: loggerSpy}
            ]
        })

        calculator = TestBed.inject(CalculatorService);
    });
    it('should add two numbers', () => {
        // Instanciating the dependecies
        // const calculator = new CalculatorService(new LoggerService());
        // const result = calculator.add(3, 9);
        // expect(result).toBe(12);

        // Mocking the dependencies with spyOn()

        // const logger = new LoggerService();
        // spyOn(logger, 'log')
        // const calculator = new CalculatorService(logger);
        // const result = calculator.add(3, 9);
        // expect(result).toBe(12);
        // expect(logger.log).toHaveBeenCalledTimes(1);
        
        // Mocking the dependencies with jasmine.createSpyObj() (fake logger service implementation)
        
        // const logger = jasmine.createSpyObj('LoggerServiceas', ['log']);
        
        // const calculator = new CalculatorService(logger);
        // const result = calculator.add(3, 9);
        // expect(result).toBe(12);
        // expect(logger.log).toHaveBeenCalledTimes(1);
        
        const result = calculator.add(3, 9);
        expect(result).toBe(12);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers', () => {
        const result = calculator.subtract(2, 2);
        expect(result).toBe(0);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
    
})