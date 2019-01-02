
<template>
<div class="container" id="GenerateCalendar">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <br /><br /><br />
            <div class="row clearfix">
                <div class="col-md-12 column">
                    <div class="jumbotron text-left">
                        <h2>
                            <span>
                                <a name="calendar"><img src="../assets/calendar-edited-100.png" /></a>
                            </span>
                            This Weeks Calendar!
                        </h2>
                        <h3>This is the weekly calendar:<br/>
                        After you assign chores to your family, watch the calendar populate below! <br/></h3>
                        <h4>Here you only get a week, but coming soon you get the current month where you can print it and stick it on your fridge!</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id='calendar'></div>       
    <div class="row clearfix">
        <div class="col-md-12">
            <br/><br/><br/>
            <br/><br/><br/>
        </div>
    </div>          
</div>
</template>
<script>

import $ from 'jquery';
import 'fullcalendar';
import { serverBus } from '../main';

    const curr = new Date;
    const Sundays = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    const Mondays = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
    const Tuesdays = new Date(curr.setDate(curr.getDate() - curr.getDay() + 2));
    const Wednesdays = new Date(curr.setDate(curr.getDate() - curr.getDay() + 3));
    const Thursdays = new Date(curr.setDate(curr.getDate() - curr.getDay() + 4));
    const Fridays = new Date(curr.setDate(curr.getDate() - curr.getDay() + 5));
    const Saturdays = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));

export default {
  name: 'calendar',
    data: function () {
        return {
            choresArr: [],
            familyArr: [],            
            assignedChores: [],
            curr: curr,
            Sundays: Sundays,
            Mondays: Mondays,
            Tuesdays: Tuesdays,
            Wednesdays: Wednesdays,
            Thursdays: Thursdays,
            Fridays: Fridays,
            Saturdays: Saturdays
        }
    },
    created: function() {
    // Using the service bus
        serverBus.$on('assignedChores', (assignedChores) => {
            this.assignedChores = assignedChores;
        });
        serverBus.$on('choresArr', (choresArr) => {
            this.choresArr = choresArr;
        });
        serverBus.$on('familyArr', (familyArr) => {
            this.familyArr = familyArr.filter((item)=>item.isParent!==true);
        });         
    },
    watch: {
        assignedChores: function() {
            var vm = this;
            $('#calendar').fullCalendar('removeEvents');
             var i = 0;
             var j = 0;
             var k = 0;
             for(i=0;i<=vm.assignedChores.length-1;i++){
                 for(j=0;j<=vm.choresArr.length-1;j++){
                    //if(vm.choresArr[j].arrIndex == vm.assignedChores[i].choreIndex){
                    if(vm.choresArr[j].choreId == vm.assignedChores[i].choreId){
                        //console.log(vm.choresArr[j].choreName);
                        break;
                    }                        
                 }
                 for(k=0;k<=vm.familyArr.length-1;k++){
                     //if(vm.familyArr[k].arrIndex == vm.assignedChores[i].memberIndex){
                     if(vm.familyArr[k].memberId == vm.assignedChores[i].memberId){
                         //console.log(vm.familyArr[k].familyMemberName);
                         break;
                     }
                 }
                 //console.log(vm.choresArr[j].dayName + " : " +  vm.choresArr[j].choreName + " : " + vm.familyArr[k].familyMemberName);
                switch (vm.choresArr[j].dayName) {
                    case 'Sunday':
                        vm.calendarItem(Sundays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        break;
                    case 'Monday':
                        vm.calendarItem(Mondays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        break;
                    case 'Tuesday':
                        vm.calendarItem(Tuesdays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        break;
                    case 'Wednesday':
                        vm.calendarItem(Wednesdays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        break;
                    case 'Thursday':
                        vm.calendarItem(Thursdays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        break;
                    case 'Friday':
                        vm.calendarItem(Fridays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        break;
                    case 'Saturday':
                        vm.calendarItem(Saturdays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        break;
                    case 'Daily':
                        vm.calendarItem(Sundays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        vm.calendarItem(Mondays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        vm.calendarItem(Tuesdays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        vm.calendarItem(Wednesdays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        vm.calendarItem(Thursdays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        vm.calendarItem(Fridays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        vm.calendarItem(Saturdays, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
                        break;
                }

                 //vm.calendarItem(vm.choresArr[j].dayName, vm.choresArr[j].choreName, vm.familyArr[k].familyMemberName);
            }
            
            
            
        }
    },    
    methods: {
        buildCalendar: function(){
            //var vm = this;
            //var i = 0;
            //for(i=0;i<=vm.assignedChores.length-1;i++){
                //alert(vm.choresArr(vm.assignedChores[i].choreIndex));
            //}
        },
        calendarItem: function(frequency,choreName,familyMemberName){
         //alert(frequency);   
         var vm = this;
         var eventDate = vm.formatDate(frequency);
         //alert(eventDate);
         $('#calendar').fullCalendar('renderEvent', {
             title: choreName + ' - ' + familyMemberName,
             start: eventDate
         });
         return;       
        },
        formatDate: function(date) {
            var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
   
            return [year, month, day].join('-');
        }
    }
};

 $(function() {
  $('#calendar').fullCalendar({
    defaultView: 'basicWeek',
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'basicDay,basicWeek'
    }
  });

 });
</script>
