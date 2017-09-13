# React table render speed test
## Comparision between inline function and arrow function
Use Chrome extension - MobX dev tool for performance comparison.  
The 1st button renders a table with randomized days. Each cell has an onClick listener which uses an inline function.  
The 2nd button renders the same data but the onClick event is hooked to a back function.   
### How to install
```
yarn install
yarn watch
```