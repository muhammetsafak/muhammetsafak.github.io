// Focus & Set Version
$('.console-input').focus();
var ver = "3.5";
$('#ver').html(ver);

// Force Lowercase Input
$('.console-input').keyup(function() {
  //this.value = this.value.toLowerCase();
});

// Force Cursor to End
$('.console-input').keydown(function() {
  this.value = this.value;
});
$('.console-input').click(function() {
  this.value = this.value;
});

// Output to Console
function output(print) {
  var cmd = $('.console-input').val();
  if(cmd==""){cmd="<span style='opacity:0;'>...</span>";}
  $("#outputs").append("<span class='output-cmd-pre'>User ></span><span class='output-cmd'>" + cmd + "</span>");

  $.each(print, function(index, value) {
    cmd = "Site";
    cmd += " >";
    if (value == "") {
      value = "&nbsp;";
    }
    $("#outputs").append("<span class='output-text-pre'>" + cmd + "</span><span class='output-text'>" + value + "</span>");
  });
  
  $('.console-input').val("");
  //$('.console-input').focus();
  $("html, body").animate({
    scrollTop: $(document).height()
  }, 300);
}

// Break Value
var newLine = "<br/> &nbsp;";

// User Commands
var cmds = {
  
  "reset": function() {
    window.location.replace(location.href);
  },

  "alert": function(a) {
    alert(a);
    output([]);
  },

  "clear": function() {
    $("#outputs").html("");
  },

  "cls": function() {
    $("#outputs").html("");
  },

  "help": function() {

    var print = ["Commands:", ""];
    print = $.merge(print, Object.keys(cmds));

    output(print);
  },

  "about": function() {

    var print = [
      "About Me:",
      "",
      "Hi I'm Muhammet!",
      "I'm a back-end developer and software engineer.",
      "",
      "I develop web and desktop applications with programming languages such as PHP, Python, C/C++, Java."
    ];

    output(print);
  },

  "cv": function() {
    var print = [
      "<a href='https://muhammetsafakcomtr.files.wordpress.com/2022/04/cv.pdf' target='_blank'>Click to view</a>",
      ""
    ];
    output(print);
  },

  "web": function() {

    var print = [
      "Website:",
      "",
      "<a href='https://www.muhammetsafak.com.tr/' target='_blank'>muhammetsafak.com.tr</a>",
      "",
    ];

    output(print);
  },

  
  "github": function() {

    var print = [
      "<a href='https://github.com/muhammetsafak' target='_blank'><span>@muhammetsafak</span></a>",
      "",
    ];

    output(print);
  },

  "linkedin": function() {

    var print = [
      "<a href='https://www.linkedin.com/in/muhammetsafakcomtr/' target='_blank'><span>@muhammetsafakcomtr</span></a>",
      "",
    ];

    output(print);
  },

  "contact": function() {

    var print = [
      "Contact Me:",
      "",
      "E-Mail: <span>info@muhammetsafak.com.tr</span>",
    ];

    output(print);
  },

};

// Output Branding
$('.console-input').val("Press Enter to launch the console...");



// Get User Command
$('.console-input').on('keypress', function(event) {
  if (event.which === 13) {
    var str = $(this).val();
    var data = str.split(' '); data.shift(); data = data.join(' ');
    var cmd = str.split(' ')[0];
    
    if (typeof cmds[cmd] == 'function') {
      if(cmds[cmd].length > 0) {
        cmds[cmd](data);
      } else {
        cmds[cmd]();
      }
    // } else if ( (str.slice(0, str.indexOf('(')) === 'function' && str.slice(-1) === '}') || typeof eval(str.slice(0, str.indexOf('('))) === 'function') {
    //   var print = [];
    //   print.push("JS Direct Code Input Run");
    //   if(str.slice(0, str.indexOf('(')) === 'function') { str = str.replace('function(){', '').slice(0, -1); }
    //   try {
    //     (new Function(str))();
    //   } catch(err) {
    //     print.push("JS Direct Code Error: " + err.message);
    //   }
    //   output(print);
    } else {
      output(["Command not found: '" + cmd + "'", "Use 'help' for list of commands."]);
    }
    $(this).val("");
  }
});

// Particles BG
particlesJS('particles-js', {
  'particles': {
    'number': {
      'value': 50
    },
    'color': {
      'value': '#ffffff'
    },
    'shape': {
      'type': 'triangle',
      'polygon': {
        'nb_sides': 5
      }
    },
    'opacity': {
      'value': 0.06,
      'random': false
    },
    'size': {
      'value': 11,
      'random': true
    },
    'line_linked': {
      'enable': true,
      'distance': 150,
      'color': '#ffffff',
      'opacity': 0.4,
      'width': 1
    },
    'move': {
      'enable': true,
      'speed': 4,
      'direction': 'none',
      'random': false,
      'straight': false,
      'out_mode': 'out',
      'bounce': false
    }
  },
  'interactivity': {
    'detect_on': 'canvas',
    'events': {
      'onhover': {
        'enable': false
      },
      'onclick': {
        'enable': true,
        'mode': 'push'
      },
      'resize': true
    },
    'modes': {
      'push': {
        'particles_nb': 4
      }
    }
  },
  'retina_detect': true
}, function() {

});