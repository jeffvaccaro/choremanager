<template>

<nav class="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Chore Manager : [v 1.1]</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Intro <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Build Family</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Add Chores</a>
      </li>      
      <li class="nav-item">
        <a class="nav-link" href="#">Assign Chores</a>
      </li>            
      <li class="nav-item">
        <a class="nav-link" href="#">Generate Calendar</a>
      </li>                  
    </ul>

    <span class="navbar-text">
      <a class="nav-link" href="#">Register [Coming Soon!]</a>
    </span>    
  </div>
</nav>

</template>           

<script>
export default {
  name: 'NavBar',
  props: {
    msg: String
  }
}
</script>     