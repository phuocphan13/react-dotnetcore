using System.Collections.Generic;
using System.Linq;
using Domain;
using System;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Activities.Any())
            {
                var activities = new List<Activity>{
                    new Activity(){
                        Id = Guid.NewGuid(),
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "pub"
                    },
                    new Activity(){
                        Id = Guid.NewGuid(),
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "pub"
                    },
                    new Activity(){
                        Id = Guid.NewGuid(),
                        Title = "Past Activity 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "pub"
                    },
                    new Activity(){
                        Id = Guid.NewGuid(),
                        Title = "Past Activity 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "pub"
                    },
                    new Activity(){
                        Id = Guid.NewGuid(),
                        Title = "Past Activity 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "pub"
                    }
                };
                context.Activities.AddRange(activities);
                context.SaveChanges();
            }
        }
    }
}