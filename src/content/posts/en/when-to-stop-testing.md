---
title: "Equivalence Classes: What should I test during software development?"
publishedAt: 2024-07-16
description: "Talking a bit about equivalence classes and how they can help determine what to test and when to stop during software development."
isPublish: false
lang: "en"
---

# Equivalence Classes: What should I test during software development?

A very common concept during software development is creating tests to ensure that the system works correctly. When developing tests for a particular functionality, it's important to know what to test and when to stop testing, to cover most scenarios without spending unnecessary time.

This is where the concept of *equivalence classes* comes in, a technique used to group different behaviors that have the same result, reducing the number of tests needed to cover all possibilities. It is considered a black-box testing technique because it does not consider the internal logic of the system, but rather the expected behavior.

In reality, most developers use this concept without knowing the exact definition, as it is a natural way of thinking about tests.

## What are Equivalence Classes?

Equivalence classes can be summarized as a technique used to group test cases by partitioning input data into different classes. Each class represents a set of valid or invalid inputs that are treated similarly by the system. By identifying these classes, we can select a representative value from each class to use in our tests, assuming that if one value in the class passes, all other values in the same class will also pass.

## How to Identify Equivalence Classes

1. **Analyze Input Data**: Identify all possible inputs for the system/functionality. Having a requirements or specifications document can help with this, but it is also possible to analyze the code to be tested to identify possible inputs.
2. **Categorize Inputs**: Divide the inputs into valid and invalid categories, determining what should pass or not.
3. **Group Similar Inputs**: Within each category, group inputs that should be treated similarly by the system.

## Practical Example

Consider a system that accepts input values from 0 to 100, representing a student's grade, and classifies the student based on this grade, with the following business rules:

- Grades from 0 to 60 are considered Failed
- Grades from 61 to 100 are considered Passed

In this way, we can identify the following equivalence classes:

**Valid Classes**:

- Grades from 61 to 100 (Passed)

**Invalid Classes**:

- Grades from 0 to 60 (Failed)
- Grades less than 0
- Grades greater than 100
- Non-numeric values

To ensure that the system handles a wide range of inputs correctly, we should create a test for each class. Examples of test values for each class are:

- Valid class: 70 (Passed grade)
- Invalid classes:
  - 30 (Failed grade)
  - -5 (Grade less than 0)
  - 150 (Grade greater than 100)
  - "abc" (Non-numeric value)

Therefore, testing a value from each class, such as 70, 30, -5, 150, and "abc", will cover a good portion of the scenarios!

## When to Stop Testing

1. **Complete Coverage**: Ensure that all equivalence classes have been tested with at least one representative value.
2. **No New Classes**: Stop when no new equivalence classes are identified from further analysis.
3. **Risk Assessment**: Consider the risk and impact of potential undiscovered bugs. If the risk is low, it may be acceptable to stop testing, depending on the context.

## Conclusion

Using equivalence classes helps create efficient test cases and save time, being a commonly used technique to ensure software quality. However, it is always good to analyze the context or complexity of the system to consider different techniques and approaches as needed.
