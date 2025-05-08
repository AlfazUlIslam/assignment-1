// To test out the code stay in root directory
// First type command: npm i
// Then type command: npm run dev

function formatString(input: string, toUpper?: boolean): string {
    const typeofToUpper = typeof toUpper;
    let output: string = "";

    if (typeofToUpper === "undefined") {
        output = input.toUpperCase();
    } else {
        toUpper ? output = input.toUpperCase() : output = input.toLowerCase();
    }

    return output;
};

type TProduct = { title: string; rating: number };
function filterByRating(items: TProduct[]): TProduct[] {
    const filteredItems: TProduct[] = [];

    items.forEach((item) => {
        if (item.rating >= 4) {
            filteredItems.push(item);
        };
    });

    return filteredItems;
};

function concatenateArrays<T>(...arrays: T[][]): T[] {
    let concatinatedArr: T[] = [];

    const arraysLength: number = arrays.length;
    for (let i: number = 0; i < arraysLength; i++) {
        concatinatedArr = [...concatinatedArr, ...arrays[i]];
    }

    return concatinatedArr;
};

class Vehicle {
    private make: string;
    private year: number;

    constructor(make: string, year: number) {
        this.make = make;
        this.year = year;
    };

    getInfo(): string {
        return `Make: ${this.make}, Year: ${this.year}`;
    };
};

class Car extends Vehicle {
    private model: string;

    constructor(make: string, year: number, model: string) {
        super(make, year);
        this.model = model;
    };

    getModel(): string {
        return `Model: ${this.model}`
    };
};

function processValue(value: string | number): number {
    let output: number = 0;

    if (typeof value === "string") {
        output = value.length;
    };
    
    if (typeof value === "number") {
        output = value * 2;
    }

    return output;
};

interface Product {
    name: string;
    price: number;
};
function getMostExpensiveProduct(products: Product[]): Product | null {
    if (products.length === 0) {
        return null;
    } else {
        let output: Product = {
            name: "",
            price: 0
        };
    
        const productsLen: number = products.length;
        for (let i: number = 0; i < productsLen; i++) {
            if (products[i].price > output.price) {
                output = products[i];
            }
        };
    
        return output;
    };
};

enum Day {
    Monday = "Weekday",
    Tuesday = "Weekday",
    Wednesday = "Weekday",
    Thursday = "Weekday",
    Friday = "Weekday",
    Saturday= "Weekend",
    Sunday= "Weekend"
}
  
function getDayType(day: Day): string {
    return day;
};

async function squareAsync(n: number): Promise<number> {
    return new Promise((resolve, reject) => {
        if (n >= 0) {
            setTimeout(() => {
                resolve(n * n);
            }, 1000);
        };

        if (n < 0) {
            reject("Error: Negative number not allowed");
        }
    });
};