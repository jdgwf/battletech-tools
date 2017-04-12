# BattleTech Tools
## Purpose
The purpose of these tools is to have a centralized, accessible set of tools for 'mech creation and eventually force building.

## Development
### Technology
This application is an Angular Javascript application that allows a user to create a BattleMech (and evenutually more!) from any device with access to a modern web browser.

The tools are powered by HTML, Foundation 6 and AngularJS. All data and logic are then compiled and handled by grunt via npm.

There are no server moving parts for the application itself, but I'm seeing the need for a backend database and exporting of the data to the application itself.

### Team
[Jeffrey D. Gordon](https://github.com/jdgwf) ([@gauthic](https://twitter.com/gauthic)), Lead Developer and designer

[MoonSword22](https://github.com/MoonSword22), Data Entry and consulting

### Current Development Targets
* Critical Allocations are better, but still wonky
* Data entry for equipment
* PDF Generation (this one is tricky, as I'll probably have to end up creating my own sheet(s) for proper copyright care.
    * A landscape option would be awesome

### Road Map to Initial Release
1. Get Succession Wars BattleMech creator working
    1. Continue to add pre 3039 equipment
    2. Filter lists as per the selected era
    3. Filter 'mech options as per selected era (double heat sinks, endo-steel, etc)
2. Add Clans
3. Calculate battle value, alpha strike and 'mech costs
4. Printable PDFs for created 'mechs
5. Test, test test!

### Eventual Goals
1. Add Battle Point force builder for common 'mechs for CBT. Records sheets are out of the question.
2. Add Force Builder for Alpha Strike
    * This would require access to the MUL data
3. Printable PDFs for A.S.
    * This should still all be done in the client's browser
