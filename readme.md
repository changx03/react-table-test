# React table render speed test
## Comparision between inline function and arrow function
Use Chrome extension - MobX dev tool for performance comparision.  
The 1st button render a table with randomized days. Each cell has a onClick listener which uses inline function.  
The 2nd button render the same data but the onClick event is hooked to a back function.  
### How to install
```
yarn install
yarn watch
```