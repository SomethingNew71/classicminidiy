---
title: 'Classic Mini EFI - Fueling'
description: 'A comprehensive guide on the fuel system parts and basic concepts related to fuel injecting your Classic Mini.'
author: 'Cole Gentry'
date: 'July 18 2023'
image: '/img/blog/efi-conversion/fueltank.jpg'
---

<!-- Content of the page -->

# How to setup your EFI Fueling System

Next up in the fuel injection journey, the fuel system itself! The fuel system requirements for EFI are a little bit different than a carb with some key differences you need to consider.

* EFI requires a high-pressure fuel pump (40psi+)
* You must put in a return line for excess fuel
* You need fuel lines that can handle pressure
* EFI requires a fuel pressure regulator

None of these are especially difficult to accomplish but all must be considered when building out a conversion kit for your Classic Mini.

<!--more-->

## Table of Contents

- [How to setup your EFI Fueling System](#how-to-setup-your-efi-fueling-system)
  - [Table of Contents](#table-of-contents)
  - [How is fueling different?](#how-is-fueling-different)
  - [Routing the Fuel Lines](#routing-the-fuel-lines)
  - [What you need](#what-you-need)
    - [High-Pressure Fuel Pump](#high-pressure-fuel-pump)
    - [Fuel Pressure Regulator](#fuel-pressure-regulator)
    - [Fuel Injectors](#fuel-injectors)
  - [Conclusion](#conclusion)


## How is fueling different?

The key difference between fueling injectors versus a carb is _pressure_ and _flow rate_. With fuel injectors, they are both firing fuel into the inlet manifold and handling the job of atomizing the fuel. In more modern engines these injectors live directly in the cylinders. In our mini's they will live in the intake manifold doing something called "port injection". Injectors are very sensitive to low pressure and require a constant stable flow and pressure to operate correctly. This is why your new pump and regulator are so important.

## Routing the Fuel Lines

Routing fuel lines for EFI may seem like a complicated task but there are a couple of options for routing you can use when setting up your system. In both options, you will need to run a supply and return for your fuel lines to and from the tank.

![Alt text](/img/blog/efi-conversion/fuelsystems.jpg)

Of these two options above the "Return System" is the most desirable. Putting your fuel rail (which lives in your engine bay) before the fuel pressure regulator will reduce the overall heat being added to your fuel by virtue of pressure. Allowing all the "warmer" excess to pass out into the return and never enter your injectors.

---

## What you need

### High-Pressure Fuel Pump

![Alt text](/img/blog/efi-conversion/fuelpump.jpg)  ![Alt text](/img/blog/efi-conversion/fueltank.jpg)

With EFI you must have a high pressure 40 psi+ for your fuel injectors. This is not like a carb with a low-pressure 3psi pump. I find the easiest way to do this is to install this in an MPI Classic Mini tank. These accept universal "in-tank" fuel pumps and arrives setup with a fuel return. All EFI fueling systems require a return line for excess pressure and fuel. You can of course drill your own return line in your own tank but the MPI tank is the cleanest setup.

> Order yours here: [MPI Fuel Pump](http://minispares.com/product/Classic/Fuel/Pumps/WFX100810.aspx?1303&ReturnUrl=/search/classic/MPI%20fuel%20pump.aspx|Back%20to%20search)
>
> Order yours here: [MPI Fuel Tank](http://minispares.com/product/Classic/Fuel/Tanks,%20fittings/WFE106090MS.aspx?1304&ReturnUrl=/search/classic/MPI%20fuel%20pump.aspx|Back%20to%20search)

### Fuel Pressure Regulator

![Alt text](/img/blog/efi-conversion/regulator.jpg)

There are many fuel pressure regulators on the market. I've chosen the Aeromotive units as they are reliable and offer rising rate ports for boosted engines. These units will allow you to accurately stabilize and set a constant fuel pressure for NA applications, or a rising rate for boosted applications.

> Order yours here: [Fuel Pressure Regulator](https://amzn.to/3Q3FzTE)

### Fuel Injectors

![Alt text](/img/blog/efi-conversion/injector.jpg)

As the name states, these are used to inject fuel into the engine. These are replacing your SU old carburetor and are controlled from the ECU with a PW (pulse width). This allows for a precise amount of fuel to be injected as needed. Once this fuel is burned your wideband 02 sensor is used to sniff the burned fuel mixture. This allows a closed-loop control to take place (EGO correction) where the ECU can make small changes to the fueling and compensates for changing conditions.

| Injector           | Notes                                     |
| ------------------ | ----------------------------------------- |
| Denso 280cc        | Good for small bore engines               |
| Denso 320cc        | Best tested for large bore NA Engines     |
| Denso 380cc        | Untested at this time                     |
| Bosch 440cc        | Standard for other EFI kits on the market |
| Siemens Deka 630cc | Good for high boost/high flow engines     |
| Bosch 630cc        | Alternative to Siemens injectors          |

## Conclusion

The fuel system, while having a fair bit of special requirements is not overly complex when you get down to installing it. These are the core items required to get this set up but purchasing rubber or PTFE fuel lines as well as fixings will be required as well.

---

[Back to Blog](/blog)