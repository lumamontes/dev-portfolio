---
title: "Data migration: trade-offs and strategies"
publishedAt: 2026-01-18
description: "Learn about the main trade-offs and strategies when performing data migrations, including ETL, Jupyter Notebook vs CLI, and practical challenges."
isPublish: false
lang: "en"
tags: ["data-migration", "etl", "data-engineering", "jupyter-notebook", "cli", "database", "best-practices", "tutorial"]
---

**Context**

I recently needed to migrate tens of thousands of audit records between two services during a task! It was my first time doing a data migration, especially at this scale, and I learned a lot, so I decided to document it in this article.


Basically, a data migration involves taking a set of information stored in a specific source (whether it's a database, a spreadsheet, or another format) and transforming it so it can be properly consumed by another service, respecting the model and rules expected at the destination.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tidf3075vbpf88htky3x.png)

The motivations for a migration are diverse: In some cases, we're dealing with legacy data that needs to be moved to a new service. In others, different systems start sharing responsibilities and need a consistent intersection of data. Often this process happens in a planned way, which allows more time for analysis and execution. But it can also arise urgently, it could be a client's demand, a department's, or due to an unexpected operational need.

The decision to migrate can come from either the product team or engineering. Still, it's the **engineering** team's **responsibility** to evaluate and make the final call on the technical feasibility of this migration! And this feasibility depends directly on the study we do about the available data.

For example, when the demand comes from product, there's usually more room for engineering to investigate complexity, risks, and costs. But none of this is resolved with just a "we can migrate, guys! let me handle it". Before any commitment, it's very important to analyze the volume, structure, and complexity of the data involved.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tijffltga9lazq3ip299.png)

A clear example: is it worth having one or two devs blocked for TWO sprints to migrate 15 records? In most scenarios, **no**. The engineering cost can be too high for a small impact on the product.

Of course, feasibility isn't just about numbers. The product context also matters. What type of data is being migrated? Is it simple or recursive data? Are there dependencies between records? Are there intermediate states, history, or business rules coupled to this data? All of this directly influences the decision.

Once the migration is considered viable, the set of problems that need to be solved becomes clearer. In general, they're divided into three main stages:

- **Extraction**: how will the data be pulled?
- **Transformation**: how will this data be adapted to the expected format?
- **Loading**: how will the transformed data be sent to the destination service?

It was in this context that I learned about **ETL**, which is an approach created precisely to organize and structure this type of process (Congratulations, you also learned what ETL is :))) 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ilolo2cpy7t1xqxes4fa.png)

Still, it's important to reinforce: **ETL** is not a silver bullet. In many cases, creating a dedicated application for migration can be unnecessary complexity. Before any implementation, it's essential to study the real feasibility of the migration, understand the format of the source data, the transformation effort, and the cost of maintaining this solution as well.

In general, ETLs make more sense when the migration needs to be executed more than once or reused in the future. For one-off migrations, a simpler solution can be sufficient and safer.

## Strategies 

When dealing with smaller migrations, I usually opt for simple solutions. In particular, I really like using Jupyter Notebook, especially when the source data is in spreadsheets or small databases. In these scenarios, I don't see much point in building an entire application just to execute a one-off process.

Creating a notebook is relatively simple: just a file with a .ipynb extension and a locally configured kernel. Depending on the context, you can use Kotlin, Python, Deno, among other options. The big advantage here is the speed to explore data, test transformations, and iterate without many difficulties.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ppnmk045glscgqcx19so.png)

For more complex migrations, my preference shifts to creating a local application that runs via terminal — a simple but controlled CLI. This type of approach allows more predictability, execution control, and ease in dealing with large volumes of data.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o8w59uslh300rzxxop5e.png)


Here, a fundamental concern is having a rollback strategy. You can never assume the migration will run perfectly the first time. Whenever possible, it's worth testing in a staging environment before executing in production, in addition to aligning the rollout very well with the team.

The way to load the data also makes a difference. In some cases, inserting directly into the database may be sufficient. In others, using an API or even publishing events to a queue is safer, especially when we're dealing with large volumes and want to process everything asynchronously.

At the end of the day, the ETL format matters less than the final objective. It can be a notebook, a CLI, or even a simple script — as long as it meets the extraction, transformation, and loading needs in a safe and predictable way.

### Practical challenges you'll face
##### Missing or inconsistent data

In real migrations, it's very common to find incomplete, inconsistent, or marked-as-removed data (like soft delete cases). These scenarios need to be handled explicitly, whether by ignoring records, filling default values, or flagging unknown data.

##### Data enrichment

Not all necessary information is always in one place. In some cases, you need to hit other databases, other services/APIs to fetch the information you need. It's good to keep an eye on this point from the start, as it increases complexity


---

### Technical trade-offs

Below are some of the main trade-offs I faced: 

#### Speed vs correctness

When the migration is urgent, you need to decide how far to accept inconsistencies in the data without compromising delivery.

#### Jupyter Notebook vs CLI

For small migrations, notebooks solve and speed things up a lot! But from personal experience, they can grow a lot and make script readability and maintenance difficult. When this happens, it's more worth adopting a CLI. 

### Migrate everything vs migrate only the essential

Not all data deserves to be migrated, it's very important to align with the product team which data will be preserved and which data we can accept as "lost", consciously.

#### Process everything at once vs in batches

From personal experience, I recommend processing records in batches and checking after each one if the data was as expected. This is much better than having to process everything at once and needing to reprocess due to any small error in data handling. 

### Conclusion

If no one noticed that the data migration happened in production, it was probably a good sign. In the end, everything comes down to context, balance, and trade-offs — and keeping the team aligned on what's possible to deliver.
