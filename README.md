# A calculator for the M.G.E. event in Age of Empires Mobile 


## Todo: 
### Main Page: 

- [ ] Initial setup 
    - [x] Display components one by one


- [ ] Day One Component 
    - [x] Input available stamina
    - [x] Input previous event scores 
    - [x] Calculate available score
    - [ ] Compare score to previous events 
    - [ ] Information button with small pop up 
- [ ] Day Two
    - [x] Input available epic and legendary medals 
        - [ ] Add rank levels for each medal for more accurate score calculation
    - [x] Input available epic and legendary skill scrolls 
        - [ ] Add rank levels for each skill for more accurate score calculation
    - [x] Input legendary gear blueprints 
    - [x] Input available forge speed up
    - [x] Input available skill points 
    - [x] Input previous event scores 
    - [x] Calculate available score based on gear blueprints or speed ups 
    - [ ] Compare score to previous events 
    - [ ] Information button with small pop up 
- [ ] Day Three
    - [ ] Select number of gather marches, their completion bonus and gather speed bonuses
    - [ ] Add functionality for full marches ready at day start 
    - [ ] Input available empire coins for wheel spins 
    - [ ] Input previous event scores 
    - [ ] Calculate available score
    - [ ] Compare score to previous events 
    - [ ] Information button with small pop up 
- [ ] Day Four
    - [x] Input number of available planishing hammers 
    - [x] Input amount of copper & silver sand, and fine gold
        - [ ] Input ring levels for more accurate score calculations
    - [x] Input available speed up minutes for building, research and universal 
    - [x] Input previous event scores 
    - [x] Calculate available score
    - [ ] Compare score to previous events 
    - [ ] Information button with small pop up 
- [ ] Day Five 
    - [x] Input number of T1 troops available for promotion and to which level they can be promoted
    - [x] Input amount of training speed ups available 
    - [x] Input previous event scores 
    - [x] Calculate available score
    - [ ] Compare score to previous events 
    - [ ] Information button with small pop up 
- [ ] Day Six
    - [x] Input potential power gain for building, troop training and research 
    - [x] Input previous event scores 
    - [x] Calculate available score
    - [ ] Compare score to previous events 
    - [ ] Information button with small pop up 
- [ ] Day Seven
    - [x] Re-use the previous component code for all the repeated scores 
    - [x] Input previous event scores 
    - [x] Calculate available score
    - [ ] Compare score to previous events 
    - [ ] Information button with small pop up 
- [ ] Total Score Component
    - [ ] List total score from entire week
    - [ ] Compare to listed scores from previous events
    - [ ] List which days are within top 10 range and which arent 
    - [ ] Determine remaining speed up needs before top 10 score can be achieved 
    - [ ] Information button with small pop up 

### Admin Page: 

- [x] Export localstorage data into text file 
- [x] Import text file to localstorage
- [x] Delete button for local storage data
- [ ] Separate Import / Export for previous event scores?

### Error Page: 
- [ ] Custom error page

### Misc: 
- [x] Redux state management 
- [x] localStorage for data permanence 
- [x] Header component
    - [x] Hamburger button with nav links to each day, admin and about page 
     - [x] Custom animation, turns button into cross
     - [x] Menu hidden under navbar 
- [ ] Footer 
    - [x] GitHub source code link 
- [x] Remove trash can from non day component headers / use different header for those pages
- [ ] Update the previous components with the local state handler from day six. 
- [ ] Update the slices with validation, ensure no calculation occur with missing values
- [ ] Final Stylefixes: 
    - [ ] Text sizes across components
    - [ ] Re-use Expandable components across the project
    - [ ] Fix bottom border and padding on Expandable section

### About page: 
- [x] Explain how data is gathered and kept 



