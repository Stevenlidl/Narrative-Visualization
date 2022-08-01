# Narrative-Visualization
CS 416 Data Visualization Final Project

Project Live Link: [Varrative Visualization for CS 416](http://stevenli.online/Narrative-Visualization/)

Data Source:
[The World Bank](https://www.worldbank.org/en/home)
[Overall data](https://data.worldbank.org/indicator/SH.DYN.NCOM.MA.ZS?name_desc=false)
[Male data](https://data.worldbank.org/indicator/SH.DYN.NCOM.ZS?name_desc=false)
[Female Data](https://data.worldbank.org/indicator/SH.DYN.NCOM.FE.ZS?name_desc=false)

### Messaging. 
What is the message you are trying to communicate with the narrative visualization?
This visualization project aims to ask why the average rate of Mortality from CVD, cancer, diabetes, or CRD is so different between different income group and gender. I have doubts while I was working on the previous Tableau Dashboard project and it leads me to make this story to explore more and question myself and audience.

As medicare and technology grow, people should be less likely to Mortality from CVD, cancer, diabetes, or CRD compare to past days. It is known that as a country being developed well, the people have more money to put into their healthy and healthy habits. Therefore, it was natural to think that the  Mortality rate from CVD, cancer, diabetes or CRD in higher-income group countries will be lower than in lower-income group countries. However, when I check the female data, it shows the hypothesis was not 100% correct. The low-income group has a lower rate than the lower middle-income group. Also, based on the total data (female + male), the low-income group has a similar rate compared to the lower middle-income group. Another observation from the data is the female Mortality rate is clearly lower than males. 

Based on the above points, I want to share that information as a narrative story that allows users to interact which the data. 

### Narrative Structure. 
Which structure was your narrative visualization designed to follow (martini glass, interactive slide show or drop-down story)? How does your narrative visualization follow that structure? (All of these structures can include the opportunity to "drill-down" and explore. The difference is where that opportunity happens in the structure.)

I've used a Martini Glass structure. I added 3 scenes to show the different line charts for different gender groups.

### Visual Structure. 
What visual structure is used for each scene? How does it ensure the viewer can understand the data and navigate the scene? How does it highlight to urge the viewer to focus on the important parts of the data in each scene? How does it help the viewer transition to other scenes, to understand how the data connects to the data in other scenes?

The navigation was simplified for the Martini Glass narration model. The audience can only navigate to the next scene by clicking on the view next scene button. It is simpler and keeps the audience from distracting by a lot of different buttons. The three scenes are using the same template to show the audience detailed information. The top part is showing the description of the page, rest is showing the line chart with a tooltip which will help the audience to get more accurate information when the audience hover the moth on the circle. The legend helps the audience to identify each income group in the line chart to provide direct visualization.

### Scenes. 
What are the scenes of your narrative visualization?  How are the scenes ordered, and why
The first scene is the average Mortality from CVD, cancer, diabetes, or CRD between 2001 to 2019 for both males and females. The second and third is for male and female alone. I re-ordered the scene based on the way I want to tell the story. First, show the overall picture and then go to different groups. I would like to make sure the audience has a big picture before digging deeper into different gender to observe the difference.

### Annotations. 
What template was followed for the annotations, and why that template? How are the annotations used to support the messaging? Do the annotations change within a single scene, and if so, how and why

I added the percentage, income group, year, and gender value as d3-tooltip on each datapoint's circle, so when a viewer performs a mouseover event, tooltip annotation pops up and shows what the rate for that specific year was. It is a good way for the audience to gather more accurate data compared to just observing the chart.

I've tried to add general annotation on the chart, but there weren't significant changes I found for the wage/salary worker's average ratio. If zoomed in, the rate might drop 2~3% on a specific event; however, the overall percentage doesn't get impacted by individual activities. That said, I've decided not to add a redundant and useless annotation to the chart.

### Parameters. 
What are the parameters of the narrative visualization? What are the states of the narrative visualization? How are the parameters used to define the state and each scene?

The parameters I have used are gender, type, color, and scenceId.
The gender and type are used to identify which CSV file should be read and used in the line chart. The science id is used to identify which scene element should show and hide.

### Triggers. 
What are the triggers that connect user actions to changes of state in the narrative visualization? What affordances are provided to the user to communicate to them what options are available to them in the narrative visualization?

I have provided a text page navigation link for users to move to the next page. An onclick event listener is bound with the navigation link. It is also internally used for tracking the page status and loading the different pages and CSV files.
