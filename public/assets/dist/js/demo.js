/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */
window.addEventListener("popstate", (event) => {
  console.log(
    "location: " + document.location + ", state: " + JSON.stringify(event.state)
  );
});

(function ($) {
  "use strict";
  $("body").append(
    '<div class="max-loader-overlay" style="display:none"><div class="inner"><img alt="loader"src="https://flevix.com/wp-content/uploads/2019/07/Ajax-Preloader.gif"></div></div>'
  );
  var $sidebar = $(".control-sidebar");
  var $container = $("<div />", {
    class: "p-3 control-sidebar-content",
  });

  $sidebar.append($container);

  var navbar_dark_skins = [
    "navbar-primary",
    "navbar-secondary",
    "navbar-info",
    "navbar-success",
    "navbar-danger",
    "navbar-indigo",
    "navbar-purple",
    "navbar-pink",
    "navbar-navy",
    "navbar-lightblue",
    "navbar-teal",
    "navbar-cyan",
    "navbar-dark",
    "navbar-gray-dark",
    "navbar-gray",
  ];

  var navbar_light_skins = [
    "navbar-light",
    "navbar-warning",
    "navbar-white",
    "navbar-orange",
  ];

  $container.append('<h5>Customize AdminLTE</h5><hr class="mb-2"/>');

  var $no_border_checkbox = $("<input />", {
    type: "checkbox",
    value: 1,
    checked: $(".main-header").hasClass("border-bottom-0"),
    class: "mr-1",
  }).on("click", function () {
    if ($(this).is(":checked")) {
      $(".main-header").addClass("border-bottom-0");
    } else {
      $(".main-header").removeClass("border-bottom-0");
    }
  });
  var $no_border_container = $("<div />", { class: "mb-1" })
    .append($no_border_checkbox)
    .append("<span>No Navbar border</span>");
  $container.append($no_border_container);

  var $text_sm_body_checkbox = $("<input />", {
    type: "checkbox",
    value: 1,
    checked: $("body").hasClass("text-sm"),
    class: "mr-1",
  }).on("click", function () {
    if ($(this).is(":checked")) {
      $("body").addClass("text-sm");
    } else {
      $("body").removeClass("text-sm");
    }
  });
  var $text_sm_body_container = $("<div />", { class: "mb-1" })
    .append($text_sm_body_checkbox)
    .append("<span>Body small text</span>");
  $container.append($text_sm_body_container);

  var $text_sm_header_checkbox = $("<input />", {
    type: "checkbox",
    value: 1,
    checked: $(".main-header").hasClass("text-sm"),
    class: "mr-1",
  }).on("click", function () {
    if ($(this).is(":checked")) {
      $(".main-header").addClass("text-sm");
    } else {
      $(".main-header").removeClass("text-sm");
    }
  });
  var $text_sm_header_container = $("<div />", { class: "mb-1" })
    .append($text_sm_header_checkbox)
    .append("<span>Navbar small text</span>");
  $container.append($text_sm_header_container);

  var $text_sm_sidebar_checkbox = $("<input />", {
    type: "checkbox",
    value: 1,
    checked: $(".nav-sidebar").hasClass("text-sm"),
    class: "mr-1",
  }).on("click", function () {
    if ($(this).is(":checked")) {
      $(".nav-sidebar").addClass("text-sm");
    } else {
      $(".nav-sidebar").removeClass("text-sm");
    }
  });
  var $text_sm_sidebar_container = $("<div />", { class: "mb-1" })
    .append($text_sm_sidebar_checkbox)
    .append("<span>Sidebar nav small text</span>");
  $container.append($text_sm_sidebar_container);

  var $text_sm_footer_checkbox = $("<input />", {
    type: "checkbox",
    value: 1,
    checked: $(".main-footer").hasClass("text-sm"),
    class: "mr-1",
  }).on("click", function () {
    if ($(this).is(":checked")) {
      $(".main-footer").addClass("text-sm");
    } else {
      $(".main-footer").removeClass("text-sm");
    }
  });
  var $text_sm_footer_container = $("<div />", { class: "mb-1" })
    .append($text_sm_footer_checkbox)
    .append("<span>Footer small text</span>");
  $container.append($text_sm_footer_container);

  var $flat_sidebar_checkbox = $("<input />", {
    type: "checkbox",
    value: 1,
    checked: $(".nav-sidebar").hasClass("nav-flat"),
    class: "mr-1",
  }).on("click", function () {
    if ($(this).is(":checked")) {
      $(".nav-sidebar").addClass("nav-flat");
    } else {
      $(".nav-sidebar").removeClass("nav-flat");
    }
  });
  var $flat_sidebar_container = $("<div />", { class: "mb-1" })
    .append($flat_sidebar_checkbox)
    .append("<span>Sidebar nav flat style</span>");
  $container.append($flat_sidebar_container);

  var $legacy_sidebar_checkbox = $("<input />", {
    type: "checkbox",
    value: 1,
    checked: $(".nav-sidebar").hasClass("nav-legacy"),
    class: "mr-1",
  }).on("click", function () {
    if ($(this).is(":checked")) {
      $(".nav-sidebar").addClass("nav-legacy");
    } else {
      $(".nav-sidebar").removeClass("nav-legacy");
    }
  });
  var $legacy_sidebar_container = $("<div />", { class: "mb-1" })
    .append($legacy_sidebar_checkbox)
    .append("<span>Sidebar nav legacy style</span>");
  $container.append($legacy_sidebar_container);

  var $compact_sidebar_checkbox = $("<input />", {
    type: "checkbox",
    value: 1,
    checked: $(".nav-sidebar").hasClass("nav-compact"),
    class: "mr-1",
  }).on("click", function () {
    if ($(this).is(":checked")) {
      $(".nav-sidebar").addClass("nav-compact");
    } else {
      $(".nav-sidebar").removeClass("nav-compact");
    }
  });
  var $compact_sidebar_container = $("<div />", { class: "mb-1" })
    .append($compact_sidebar_checkbox)
    .append("<span>Sidebar nav compact</span>");
  $container.append($compact_sidebar_container);

  var $child_indent_sidebar_checkbox = $("<input />", {
    type: "checkbox",
    value: 1,
    checked: $(".nav-sidebar").hasClass("nav-child-indent"),
    class: "mr-1",
  }).on("click", function () {
    if ($(this).is(":checked")) {
      $(".nav-sidebar").addClass("nav-child-indent");
    } else {
      $(".nav-sidebar").removeClass("nav-child-indent");
    }
  });
  var $child_indent_sidebar_container = $("<div />", { class: "mb-1" })
    .append($child_indent_sidebar_checkbox)
    .append("<span>Sidebar nav child indent</span>");
  $container.append($child_indent_sidebar_container);

  var $no_expand_sidebar_checkbox = $("<input />", {
    type: "checkbox",
    value: 1,
    checked: $(".main-sidebar").hasClass("sidebar-no-expand"),
    class: "mr-1",
  }).on("click", function () {
    if ($(this).is(":checked")) {
      $(".main-sidebar").addClass("sidebar-no-expand");
    } else {
      $(".main-sidebar").removeClass("sidebar-no-expand");
    }
  });
  var $no_expand_sidebar_container = $("<div />", { class: "mb-1" })
    .append($no_expand_sidebar_checkbox)
    .append("<span>Main Sidebar disable hover/focus auto expand</span>");
  $container.append($no_expand_sidebar_container);

  var $text_sm_brand_checkbox = $("<input />", {
    type: "checkbox",
    value: 1,
    checked: $(".brand-link").hasClass("text-sm"),
    class: "mr-1",
  }).on("click", function () {
    if ($(this).is(":checked")) {
      $(".brand-link").addClass("text-sm");
    } else {
      $(".brand-link").removeClass("text-sm");
    }
  });
  var $text_sm_brand_container = $("<div />", { class: "mb-4" })
    .append($text_sm_brand_checkbox)
    .append("<span>Brand small text</span>");
  $container.append($text_sm_brand_container);

  $container.append("<h6>Navbar Variants</h6>");

  var $navbar_variants = $("<div />", {
    class: "d-flex",
  });
  var navbar_all_colors = navbar_dark_skins.concat(navbar_light_skins);
  var $navbar_variants_colors = createSkinBlock(navbar_all_colors, function (
    e
  ) {
    var color = $(this).data("color");
    var $main_header = $(".main-header");
    $main_header.removeClass("navbar-dark").removeClass("navbar-light");
    navbar_all_colors.map(function (color) {
      $main_header.removeClass(color);
    });

    if (navbar_dark_skins.indexOf(color) > -1) {
      $main_header.addClass("navbar-dark");
    } else {
      $main_header.addClass("navbar-light");
    }

    $main_header.addClass(color);
  });

  $navbar_variants.append($navbar_variants_colors);

  $container.append($navbar_variants);

  var sidebar_colors = [
    "bg-primary",
    "bg-warning",
    "bg-info",
    "bg-danger",
    "bg-success",
    "bg-indigo",
    "bg-lightblue",
    "bg-navy",
    "bg-purple",
    "bg-fuchsia",
    "bg-pink",
    "bg-maroon",
    "bg-orange",
    "bg-lime",
    "bg-teal",
    "bg-olive",
  ];

  var accent_colors = [
    "accent-primary",
    "accent-warning",
    "accent-info",
    "accent-danger",
    "accent-success",
    "accent-indigo",
    "accent-lightblue",
    "accent-navy",
    "accent-purple",
    "accent-fuchsia",
    "accent-pink",
    "accent-maroon",
    "accent-orange",
    "accent-lime",
    "accent-teal",
    "accent-olive",
  ];

  var sidebar_skins = [
    "sidebar-dark-primary",
    "sidebar-dark-warning",
    "sidebar-dark-info",
    "sidebar-dark-danger",
    "sidebar-dark-success",
    "sidebar-dark-indigo",
    "sidebar-dark-lightblue",
    "sidebar-dark-navy",
    "sidebar-dark-purple",
    "sidebar-dark-fuchsia",
    "sidebar-dark-pink",
    "sidebar-dark-maroon",
    "sidebar-dark-orange",
    "sidebar-dark-lime",
    "sidebar-dark-teal",
    "sidebar-dark-olive",
    "sidebar-light-primary",
    "sidebar-light-warning",
    "sidebar-light-info",
    "sidebar-light-danger",
    "sidebar-light-success",
    "sidebar-light-indigo",
    "sidebar-light-lightblue",
    "sidebar-light-navy",
    "sidebar-light-purple",
    "sidebar-light-fuchsia",
    "sidebar-light-pink",
    "sidebar-light-maroon",
    "sidebar-light-orange",
    "sidebar-light-lime",
    "sidebar-light-teal",
    "sidebar-light-olive",
  ];

  $container.append("<h6>Accent Color Variants</h6>");
  var $accent_variants = $("<div />", {
    class: "d-flex",
  });
  $container.append($accent_variants);
  $container.append(
    createSkinBlock(accent_colors, function () {
      var color = $(this).data("color");
      var accent_class = color;
      var $body = $("body");
      accent_colors.map(function (skin) {
        $body.removeClass(skin);
      });

      $body.addClass(accent_class);
    })
  );

  $container.append("<h6>Dark Sidebar Variants</h6>");
  var $sidebar_variants_dark = $("<div />", {
    class: "d-flex",
  });
  $container.append($sidebar_variants_dark);
  $container.append(
    createSkinBlock(sidebar_colors, function () {
      var color = $(this).data("color");
      var sidebar_class = "sidebar-dark-" + color.replace("bg-", "");
      var $sidebar = $(".main-sidebar");
      sidebar_skins.map(function (skin) {
        $sidebar.removeClass(skin);
      });

      $sidebar.addClass(sidebar_class);
    })
  );

  $container.append("<h6>Light Sidebar Variants</h6>");
  var $sidebar_variants_light = $("<div />", {
    class: "d-flex",
  });
  $container.append($sidebar_variants_light);
  $container.append(
    createSkinBlock(sidebar_colors, function () {
      var color = $(this).data("color");
      var sidebar_class = "sidebar-light-" + color.replace("bg-", "");
      var $sidebar = $(".main-sidebar");
      sidebar_skins.map(function (skin) {
        $sidebar.removeClass(skin);
      });

      $sidebar.addClass(sidebar_class);
    })
  );

  var logo_skins = navbar_all_colors;
  $container.append("<h6>Brand Logo Variants</h6>");
  var $logo_variants = $("<div />", {
    class: "d-flex",
  });
  $container.append($logo_variants);
  var $clear_btn = $("<a />", {
    href: "javascript:void(0)",
  })
    .text("clear")
    .on("click", function () {
      var $logo = $(".brand-link");
      logo_skins.map(function (skin) {
        $logo.removeClass(skin);
      });
    });
  $container.append(
    createSkinBlock(logo_skins, function () {
      var color = $(this).data("color");
      var $logo = $(".brand-link");
      logo_skins.map(function (skin) {
        $logo.removeClass(skin);
      });
      $logo.addClass(color);
    }).append($clear_btn)
  );

  function createSkinBlock(colors, callback) {
    var $block = $("<div />", {
      class: "d-flex flex-wrap mb-3",
    });

    colors.map(function (color) {
      var $color = $("<div />", {
        class:
          (typeof color === "object" ? color.join(" ") : color)
            .replace("navbar-", "bg-")
            .replace("accent-", "bg-") + " elevation-2",
      });

      $block.append($color);

      $color.data("color", color);

      $color.css({
        width: "40px",
        height: "20px",
        borderRadius: "25px",
        marginRight: 10,
        marginBottom: 10,
        opacity: 0.8,
        cursor: "pointer",
      });

      $color.hover(
        function () {
          $(this)
            .css({ opacity: 1 })
            .removeClass("elevation-2")
            .addClass("elevation-4");
        },
        function () {
          $(this)
            .css({ opacity: 0.8 })
            .removeClass("elevation-4")
            .addClass("elevation-2");
        }
      );

      if (callback) {
        $color.on("click", callback);
      }
    });

    return $block;
  }

  $(".product-image-thumb").on("click", function () {
    const image_element = $(this).find("img");
    $(".product-image").prop("src", $(image_element).attr("src"));
    $(".product-image-thumb.active").removeClass("active");
    $(this).addClass("active");
  });

  const windowUrl = window.location.href;
  const windowPath = window.location.pathname;
  $(".nav-sidebar li.nav-item").removeClass("active");
  $(".nav-sidebar li.nav-item > a").removeClass("active").removeClass("active");

  $(".nav-sidebar li.nav-item > a").each(function () {
    const itsHref = $(this).attr("href");
    if (windowPath == itsHref) {
      $(this).addClass("active");
    }
  });

  // if (window.location.pathname == "/admin") {
  //   //$('.nav-sidebar li.nav-item > a[href="#"]').addClass("active");
  //   $("body").addClass("loading");
  //   $.get("/admin/dashboard", function(data, status) {
  //     if (status == "success") {
  //       console.log(data);
  //       $("body").removeClass("loading");
  //       $("#total_user_count").text(data.data.totalUser);
  // 	$("#total_lessons_count").text(data.data.totalLessons);
  // 	$("#total_recordings_count").text(data.data.totalRecordingTasks);
  // 	localStorage.setItem("userCount", data.data.totalUser);
  // 	localStorage.setItem("lessonCount", data.data.totalLessons);
  // 	localStorage.setItem("recordingsCount", data.data.totalRecordingTasks);
  //     }
  //   });
  // }
  // else {
  // $.get("/admin/dashboard", function(data, status) {
  // 	if (status == "success") {
  // 	localStorage.setItem("userCount", data.data.totalUser);
  // 	localStorage.setItem("lessonCount", data.data.totalLessons);
  // 	localStorage.setItem("recordingsCount", data.data.totalRecordingTasks);
  // 	}
  // });
  // }

  $.get("/admin/listsInfo", function (data, status) {
    if (status == "success") {
      localStorage.setItem("userCount", data.data.totalUser);
      localStorage.setItem("lessonCount", data.data.totalLessons);
      localStorage.setItem("recordingsCount", data.data.totalRecordingTasks);
    }
  });

  $(".brand-link").attr("href", "javascript:;");

  function getOriginalUrl() {
    history.pushState(null, null, window.location.pathname);
    delete window.prevLocationHash;
  }

  function setHashUrl(hashPath) {
    history.pushState(null, null, `${window.location.pathname}${hashPath}`);
    window.prevLocationHash = hashPath;
  }

  /*$(document).on("click", 'a.nav-link[href*="/deleteUser/"]', function(e) {
  $("body").addClass("loading");
  e.preventDefault();
  let rowEle = $(this).closest("tr");
  const itsAPIHref = $(this).attr("href");
  $.get(itsAPIHref, function(data, status) {
  if (status == "success") {
    $("body").removeClass("loading");
    console.log("Data: " + data + "\nStatus: " + status);
    rowEle.remove();
  }
  });
});*/
  let disableButton;
  let typeDelete = false;
  $(document).on("click", "#doProcess", function () {
    // $("body").addClass("loading");
    $(".max-loader-overlay").fadeIn();
    $("#confirmation_box").fadeOut();

    let rowEle = disableButton.closest("tr");
    const disableUrl = disableButton.attr("href");
    if (typeDelete == true) {
      var settings = {
        url: disableUrl,
        type: "delete",
        dataType: "text",
        cache: false,
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        success: function () {
          console.log("Success");
          setTimeout(function () {
            // $("body").removeClass("loading");
            $(".max-loader-overlay").fadeOut();
            location.reload();
          }, 1000);
        },
        error: function () {
          console.log("Error");
          alert("Something went wrong!!");
          // $("body").removeClass("loading");
          $(".max-loader-overlay").fadeOut();
        },
      };
      $.ajax(settings);
    }
    $.get(disableUrl, function (data, status) {
      if (status == "success") {
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
        location.reload();
        if (data.data.status == 1) {
          rowEle.addClass("disabled");
          disableButton.text("Enable");
        } else {
          rowEle.removeClass("disabled");
          disableButton.text("Disable");
        }
      } else {
        alert("Something went wrong!!");
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
      }
    });
    setTimeout(function () {
      alert("Something went wrong!!");
      // $("body").removeClass("loading");
      $(".max-loader-overlay").fadeOut();
    }, 40000);
  });

  $(document).on("click", "button#cancelProcess", function (e) {
    typeDelete = false;
    $("#confirmation_box").fadeOut();
  });
  $(document).on("click", "a.toggle-user", function (event) {
    event.preventDefault();
    $("#confirmation_box").fadeIn();
    disableButton = $(this);
    let confirm_message = "Are you sure to disable the user?";
    if (disableButton.text() == "Disable") {
      confirm_message = "Are you sure to disable the user?";
    }
    $("p#confirm-message").text(confirm_message);
  });

  $(document).on("click", `a.delete_recording`, function (e) {
    e.preventDefault();
    $("#confirmation_box").fadeIn();
    disableButton = $(this);
    typeDelete = true;
    let confirm_message = "Are you sure to delete the recording?";
    // if (disableButton.text() == "Disable") {
    //   confirm_message = "Are you sure to disable the user?";
    // }
    $("p#confirm-message").text(confirm_message);
  });
  $(document).on("click", `a.delete-user-link`, function (event) {
    event.preventDefault();
    $("#confirmation_box").fadeIn();
    disableButton = $(this);
    let confirm_message = "Are you sure to delete the user?";
    // if (disableButton.text() == "Disable") {
    //   confirm_message = "Are you sure to disable the user?";
    // }
    $("p#confirm-message").text(confirm_message);
  });

  $(document).on("click", `a.delete-lesson-link`, function (e) {
    typeDelete = true;
    e.preventDefault();
    $("#confirmation_box").fadeIn();
    disableButton = $(this);
    let confirm_message = "Are you sure to delete the lesson?";
    // if (disableButton.text() == "Disable") {
    //   confirm_message = "Are you sure to disable the user?";
    // }
    $("p#confirm-message").text(confirm_message);
  });

  $(document).on("click", `a.delete-question-link`, function (e) {
    typeDelete = true;
    e.preventDefault();
    $("#confirmation_box").fadeIn();
    disableButton = $(this);
    let confirm_message = "Are you sure to delete the Question?";
    // if (disableButton.text() == "Disable") {
    //   confirm_message = "Are you sure to disable the user?";
    // }
    $("p#confirm-message").text(confirm_message);
  });

  $("input#search_input").val(window.location.href.split("?search=")[1]);
  $(document).on(
    "click",
    'table#example1 a[href*="/admin/getUserDetailsById/"]',
    function (e) {
      // $("body").addClass("loading");
      $(".max-loader-overlay").fadeIn();
      $("body").removeClass("userDetailsOpen");
      const itsUserHref = $(this).attr("href");

      e.preventDefault();
      $(".cm-lessons-data").remove();
      $(".cm-users-info-inner").html("");
      $.get(itsUserHref, function (data, status) {
        if (status == "success") {
          setHashUrl("#viewUser");
          const userInfo = data.data;
          let lessons = userInfo.lessonData;
          let lessonsLength = lessons.length;
          let completedLesson = lessons.lessonName;
          let completedExercise;
          if (completedLesson != "N/A" && lessons.homework) {
            completedExercise = lessons.homework.name;
          }
          let homeworksLength;
          let homeworks;

          // $("body").removeClass("loading");
          $(".max-loader-overlay").fadeOut();
          $("body").addClass("userDetailsOpen");
          let userImage = userInfo.userDetails[0].userImage;
          let htmlForImage = `<i class="fa fa-user"></i>`;
          if (Boolean(userImage)) {
            htmlForImage = `<img src="${userImage}" alt="" id="cm_user_img"></img>`;
          }
          $(".cm-users-info-popup").fadeIn();
          $(`<div class="cm-users-details">
  <div class="cm-users-details-inner">
    <div class="cm-user-image">
      ${htmlForImage}
    </div>
    <div class="user-name-email">
      <h4 id="cm_user_name"><span class="lbl">Name:</span><span class="cm-val">${userInfo.userDetails[0].name}</span></h4>
      <h5 id="cm_user_email"><span class="lbl">Email Id:</span><span class="cm-val">${userInfo.userDetails[0].email}</span></h5>
    </div>
  </div>
  </div>`).appendTo(".cm-users-info-inner");
          if (completedExercise == undefined) {
            completedExercise = "N/A";
          }
          $(
            `<div class="completed-tasks"><strong>Completed Tasks</strong>(Lesson/Homework):-<strong id="completed-lesson">${completedLesson}</strong>&nbsp;&nbsp;/&nbsp;&nbsp;<strong id="completed-exercise">${completedExercise}</strong></div>`
          ).appendTo(".cm-users-info-inner");

          if (userInfo.questionAnswerData) {
            let questionsList = userInfo.questionAnswerData;
            $(
              `<div class="questionAnswerDataWrapper"><h4>Question/Answers List</h4><div class="questionAnswerData"></div></div>`
            ).appendTo(".cm-users-info-inner");
            let quesIndex = 0;
            for (let item in questionsList) {
              quesIndex++;
              let answers = questionsList[item];
              $(`<div class="question-item item-${quesIndex}">
        <h4><span class="cm-label">Question:</span><span class="ques-val">${item}</span>
        </h4><div class="answersList"></div>
        </div>`).appendTo(".questionAnswerData");
              answers.forEach(function (item) {
                $(
                  `<div class="answer-item"><p>${item.answer || "NA"}</p></div>`
                ).appendTo(`.question-item.item-${quesIndex} .answersList`);
              });
            }
          }

          /*
        if (userInfo.lessonData.length > 0) {
        $(".cm-users-info-inner").append(`<div class="cm-lessons-data">
          <h3>Lessons</h3>
          <div class="lessons-listing">
            <ul>
              
            </ul>
          </div>
        </div>`);
        userInfo.lessonData.forEach(function(item, index) {
          $(".lessons-listing > ul").append(
          `<li><div class="lesson-info"><h4>${item.lessonName}</h4></div></li>`
          );
          if (item.status == "Feedback Completed") {
          let itemELe = $(".lessons-listing > ul > li").eq(index);
    
          itemELe
            .find("div.lesson-info")
            .append(`<span class="status">${item.status}</span>`);
          itemELe.append(`<div class="home-works">
            <h3>Home Works</h3>
                <ul>
                </ul>
              </div>`);
          item.homework.forEach(function(homework, index2) {
            itemELe
            .find(".home-works > ul")
            .append(
              `<li><h5>${homework.exerciseName}</h5><span class="status">${homework.status}</span></li>`
            );
          });
          }
        });
        }
    */

          console.log(data);
        }
      });
    }
  );

  $(document).on(
    "click",
    ".lesson-info:first-child:not(:last-child)",
    function () {
      $(this).next(".home-works").slideToggle();
    }
  );

  $(document).on("click", "span.cm-close-icon", function () {
    $("body").removeClass("userDetailsOpen");
    $(".add-lesson-modal").fadeOut();
    $(".cm-users-info-popup").fadeOut();
    $("body").removeClass("edit-mode");
    $("body").removeClass("cm_pop_open");
    getOriginalUrl();
  });

  /*===== User Pagination ======*/

  if (window.location.pathname == "/admin/getUsersList") {
    let usersCount = Number(localStorage.getItem("userCount"));
    let pageLimit = 20;
    let pageCount =
      usersCount % pageLimit == 0
        ? usersCount / pageLimit
        : usersCount / pageLimit + 1;
    $("select#cm-pagination-select").html("");
    for (let i = 1; i <= pageCount; i++) {
      $("select#cm-pagination-select").append(
        `<option value="${i - 1}">${i}</option>`
      );
    }
    if (windowUrl.indexOf("?page=") > 0) {
      let currentUsePage = Number(windowUrl.split("?page=")[1]);
      $("select#cm-pagination-select > option")
        .eq(currentUsePage)
        .attr("selected", "selected");
    }

    $("select#cm-pagination-select").change(function () {
      let itsPageVal = $(this).val();
      var makeUserUrl = "/admin/getUsersList?page=" + itsPageVal;
      window.location.href = makeUserUrl;
    });
  }

  if (window.location.pathname == "/admin/getLessons") {
    let usersCount = Number(localStorage.getItem("lessonCount"));
    let pageLimit = 20;
    let pageCount =
      usersCount % pageLimit == 0
        ? usersCount / pageLimit
        : usersCount / pageLimit + 1;
    $("select#cm-pagination-select").html("");
    for (let i = 1; i <= pageCount; i++) {
      $("select#cm-pagination-select").append(
        `<option value="${i - 1}">${i}</option>`
      );
    }
    if (windowUrl.indexOf("?page=") > 0) {
      let currentUsePage = Number(windowUrl.split("?page=")[1]);
      $("select#cm-pagination-select > option")
        .eq(currentUsePage)
        .attr("selected", "selected");
    }

    $("select#cm-pagination-select").change(function () {
      let itsPageVal = $(this).val();
      var makeUserUrl = "/admin/getLessons?page=" + itsPageVal;
      window.location.href = makeUserUrl;
    });
  }

  /*==== Recording Pagination =====*/
  if (window.location.pathname == "/admin/recordingList") {
    let usersCount = Number(localStorage.getItem("recordingsCount"));
    let pageLimit = 20;
    let pageCount =
      usersCount % pageLimit == 0
        ? usersCount / pageLimit
        : usersCount / pageLimit + 1;
    $("select#cm-pagination-select").html("");
    for (let i = 1; i <= pageCount; i++) {
      $("select#cm-pagination-select").append(
        `<option value="${i - 1}">${i}</option>`
      );
    }
    if (windowUrl.indexOf("?page=") > 0) {
      let currentUsePage = Number(windowUrl.split("?page=")[1]);
      $("select#cm-pagination-select > option")
        .eq(currentUsePage)
        .attr("selected", "selected");
    }

    $("select#cm-pagination-select").change(function () {
      let itsPageVal = $(this).val();
      var makeUserUrl = "/admin/recordingList?page=" + itsPageVal;
      window.location.href = makeUserUrl;
    });
  }

  /***   Lessons */
  let lessonItem = $(".lesson-tasks-listing").html();
  $(".lesson-tasks-listing").html("");
  $(document).on("click", "button#addLessonBtn", function () {
    wrapForm();
    $("body").removeClass("edit_mode_active");
    $(".lesson-tasks-listing").html("");
    var lessonCount = Number(localStorage.getItem("lessonCount")) + 1;
    console.log(lessonCount);
    $("h2#new_lesson_name").attr("data-sortorder", lessonCount);
    $("input#new_lesson_name_input").val("");
    $(".input-item.duration-item.lesson-duration>input").val("");
    $(".lesson-tasks-listing").append(lessonItem);
    $(".add-lesson-modal").fadeIn();
    setHashUrl("#addLesson");
    $("body").addClass("cm_pop_open");
  });

  function wrapForm() {
    if ($("form#save_homework_form").html() == "") {
      $("form#save_homework_form").remove();
      $(".add-homework-modal-inner").wrapAll(
        '<form id="save_homework_form" action=""></form>'
      );
    }
    if ($("form#save_lesson_form").html() == "") {
      $("form#save_lesson_form").remove();
      $(".add-lesson-modal-inner").wrapAll(
        '<form id="save_lesson_form" action=""></form>'
      );
    }
  }

  function fromSeconds(seconds) {
    let getSeconds = seconds % 60;
    let minutes = parseInt(seconds / 60);
    return { mins: minutes, seconds: getSeconds };
  }
  $(document).on(
    "change",
    ".lesson-tasks-item .radio-item >input",
    function () {
      let parentEle = $(this).closest(".lesson-tasks-item");
      let itsVal = $(this).val();
      $(this).addClass("active");
      $(this)
        .closest(".radio-groups")
        .find("input")
        .not($(this))
        .removeClass("active");
      if (itsVal == "video") {
        parentEle
          .find(".videoField.input-item > input")
          .attr("required", "required");
        parentEle
          .find(".textField.input-item > textarea")
          .removeAttr("required");
        parentEle
          .find(".videoField.input-item")
          .removeClass("hide")
          .addClass("show");
        parentEle
          .find(".textField.input-item")
          .removeClass("show")
          .addClass("hide");
      } else {
        parentEle
          .find(".textField.input-item")
          .removeClass("hide")
          .addClass("show");
        parentEle
          .find(".videoField.input-item")
          .removeClass("show")
          .addClass("hide");
        parentEle
          .find(".textField.input-item > textarea")
          .attr("required", "required");
        parentEle.find(".videoField.input-item > input").removeAttr("required");
      }
    }
  );

  $(document).on("click", "a.add_new_lesson_task", function (e) {
    e.preventDefault();
    let beforeleng = $(".lesson-tasks-item").length;
    $(lessonItem).appendTo(".lesson-tasks-listing");
    let itemCount = $(".lesson-tasks-item").length;
    let parentEle = $(".lesson-tasks-item").eq(itemCount - 1);
    parentEle.find("input.task_name_input").val(`Task ${itemCount}`);
    parentEle
      .find(".radio-item.check-text > input")
      .attr("id", `txt${itemCount}`);
    parentEle
      .find(".radio-item.check-text > label")
      .attr("for", `txt${itemCount}`);
    parentEle
      .find(".radio-item.check-video > input")
      .attr("id", `vid${itemCount}`);
    parentEle
      .find(".radio-item.check-video > label")
      .attr("for", `vid${itemCount}`);
    parentEle.find(".radio-item > input").attr("name", `type-${itemCount}`);
    parentEle
      .find('input[type=radio][name="type-1"].active')
      .prop("checked", true);
  });

  $(document).on("click", "a.remove-task-btn", function (e) {
    e.preventDefault();
    let parentEle = $(this).closest(".lesson-tasks-item");
    parentEle.remove();
    $(".lesson-tasks-item").each(function () {
      let itSelf = $(this);
      let itemIndex = itSelf.index() + 1;
      itSelf.find("input.task_name_input").val(`Task ${itemIndex}`);
      itSelf
        .find(".radio-item.check-text > input")
        .attr("id", `txt${itemIndex}`);
      itSelf
        .find(".radio-item.check-text > label")
        .attr("for", `txt${itemIndex}`);
      itSelf
        .find(".radio-item.check-video > input")
        .attr("id", `vid${itemIndex}`);
      itSelf
        .find(".radio-item.check-video > label")
        .attr("for", `vid${itemIndex}`);
      itSelf.find(".radio-item > input").attr("name", `type-${itemIndex}`);
    });
  });

  $(document).on("change", "input.selectVideo", function (e) {
    var element = $(this);
    var itsCDNEle = $(this).siblings(".videoFileOnServer");
    if ($(this).prop("files").length > 0) {
      var file = $(this).prop("files")[0];
      // $("body").addClass("loading");
      $(".max-loader-overlay").fadeIn();
      var form = new FormData();
      form.append("file", file);

      var settings = {
        url: "/admin/uploadFile",
        type: "post",
        dataType: "text",
        cache: false,
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,
      };

      $.ajax(settings).done(function (response) {
        var res = JSON.parse(response);
        console.log(res.data.url);
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
        itsCDNEle.text(res.data.url);
        itsCDNEle.attr("duration", res.data.duration);
      });
    }
  });

  let directAdd = 0;
  $(document).on("submit", "#save_lesson_form", function (e) {
    e.preventDefault();
    // $("body").addClass("loading");
    $(".max-loader-overlay").fadeIn();
    let lessonSortOrder = $("h2#new_lesson_name").attr("data-sortorder");
    let lessonName = $("input#new_lesson_name_input").val();
    let lessonContent = [];
    let contentOrder = 1;
    let minsDuration = Number($(".lesson-duration input.min-duration").val());
    let secondsDuration = Number(
      $(".lesson-duration input.second-duration").val()
    );
    let itsDuration = toSeconds(minsDuration, secondsDuration);
    $(".lesson-tasks-item").each(function (i, item) {
      let taskObject = {};
      let contentType = $(this).find(".radio-item input:checked").val();
      let textContent = $(this).find("textarea.textarea_input").val();
      if (contentType == "text" && textContent.length > 0) {
        taskObject = {
          contentText: textContent,
          //duration: Number(itsDuration),
          contentOrder: contentOrder,
          contentType: "text",
          isDeleted: false,
        };
        contentOrder++;
        lessonContent.push(taskObject);
      }
      let videoFileUrl = $(this).find(".videoFileOnServer").text();
      let videoFileDuration = $(this)
        .find(".videoFileOnServer")
        .attr("duration");
      if (contentType == "video" && videoFileUrl.length > 10) {
        taskObject = {
          contentUrl: videoFileUrl,
          duration: Number(videoFileDuration),
          contentOrder: contentOrder,
          contentType: "video",
          isDeleted: false,
        };
        console.log(taskObject);
        lessonContent.push(taskObject);
        contentOrder++;
      }
    });
    let apiUrl = "/admin/saveLessons";
    let lessonId = $("a.view-lesson-btn.clicked").attr("data-id");
    let lessonOrder = Number(lessonSortOrder);
    let postData = {
      lessonName: lessonName,
      sortOrder: lessonOrder,
      totalTime: itsDuration,
      lessonContent: lessonContent,
    };
    if ($("body").hasClass("edit-mode")) {
      postData = {
        lessonName: lessonName,
        sortOrder: lessonOrder,
        totalTime: itsDuration,
        lessonContent: lessonContent,
        id: lessonId,
      };
    }
    console.log(postData);
    $.ajax({
      type: "POST",
      url: apiUrl,
      data: postData,
      success: function (res) {
        $(".add-lesson-modal").fadeOut();
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
        $("body").removeClass("popupOpen");
        location.reload();
        console.log("res", res);
      },
      error: function () {
        alert("Something went wrong!");
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
      },
    });
    setTimeout(function () {
      alert("Something went wrong!");
      // $("body").removeClass("loading");
      $(".max-loader-overlay").fadeOut();
    }, 50000);
  });

  /*====== HomeWorks ======*/
  let homeworkItem = $(".homework-tasks-listing").html();
  $(document).on("click", ".addHomeWork", function () {
    $(".cm-exercise-item + .cm-exercise-item").remove();
    let apiUrl = $(this).attr("data-detail");
    let itSelf = $(this);
    // $("body").addClass("loading");
    $(".max-loader-overlay").fadeIn();
    $.ajax({
      type: "GET",
      url: apiUrl,
      success: function (res) {
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
        let lastHomeWork = 1;
        if (res.data.lessonData[0].homework) {
          lastHomeWork = res.data.lessonData[0].homework.length + 1;
        }
        console.log("res", lastHomeWork);
        let lessonTitle = itSelf.closest("tr").find("td.lessonName").text();
        let lessonId = itSelf
          .closest("tr")
          .find("td.lessonName")
          .attr("data-id");
        $("h2#cm_lesson_title")
          .text(lessonTitle)
          .attr("data-lessonid", lessonId)
          .attr("data-lastlesson", lastHomeWork);
        $(".add-homework-modal").fadeIn();
        $(".exercise-title").val(`Exercise ${lastHomeWork}`);
        $("body").addClass("homework-pop-open");
        wrapForm();
      },
      error: function () {
        alert("Something went wrong!");
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
      },
    });
    directAdd = 1;
  });

  let exerciseItem = $(".cm-exercise-listing").html();
  let exerciseTaskItemEle = $(".homework-tasks-listing").html();
  $(".homework-tasks-listing").html("");
  let exerciseItemEle = $(".cm-exercise-listing").html();
  $(".cm-exercise-listing").html("");

  $(document).on("click", ".editHomeWork", function () {
    $(".cm-exercise-listing").html("");
    $(".cm-exercise-item + .cm-exercise-item").remove();
    let apiUrl = $(this).attr("data-detail");
    let itSelf = $(this);
    // $("body").addClass("loading");
    $(".max-loader-overlay").fadeIn();
    $("body").addClass("cm_pop_open");
    $.ajax({
      type: "GET",
      url: apiUrl,
      success: function (res) {
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
        $("body").addClass("edit_mode_active");

        let lastHomeWork = 1;
        let lessonTitle = itSelf.closest("tr").find("td.lessonName").text();
        let lessonId = itSelf
          .closest("tr")
          .find("td.lessonName")
          .attr("data-id");
        if (
          res.data.lessonData[0].homework &&
          res.data.lessonData[0].homework.length > 0
        ) {
          lastHomeWork = res.data.lessonData[0].homework.length;

          res.data.lessonData[0].homework.forEach(function (item, index) {
            $(".cm-exercise-listing").append(exerciseItemEle);
            let homeWorkELe = $(".cm-exercise-listing > .cm-exercise-item").eq(
              index
            );
            homeWorkELe
              .find(".exercise-title")
              .val(item.name)
              .attr("data-id", item._id);
            let duration = fromSeconds(item.totalTime);
            let mins = duration.mins;
            let seconds = duration.seconds;
            homeWorkELe
              .find(".input-item.duration-item.exercise-duration")
              .find("input.min-duration")
              .val(mins);
            homeWorkELe
              .find(".input-item.duration-item.exercise-duration")
              .find("input.second-duration")
              .val(seconds);
            item.homeworkDetail.forEach(function (task, childIndex) {
              homeWorkELe
                .find(".homework-tasks-listing")
                .append(exerciseTaskItemEle);
              let taskELe = homeWorkELe
                .find(".homework-tasks-listing > .homework-tasks-item")
                .eq(childIndex);

              taskELe
                .find(".radio-item.check-text > input")
                .attr("id", `homework_excercise_${index}_txt_${childIndex}`);
              taskELe
                .find(".radio-item.check-text > label")
                .attr("for", `homework_excercise_${index}_txt_${childIndex}`);
              taskELe
                .find(".radio-item.check-video > input")
                .attr("id", `homework_excercise_${index}_vid_${childIndex}`);
              taskELe
                .find(".radio-item.check-video > label")
                .attr("for", `homework_excercise_${index}_vid_${childIndex}`);
              taskELe
                .find(".radio-item > input")
                .attr("name", `homework_excercise_${index}_type_${childIndex}`);
              $(".homework-tasks-listing").each(function (i, e) {
                $(this)
                  .find(".homework-tasks-item")
                  .each(function (i) {
                    $(this)
                      .find(".homework_name_input")
                      .val("Task " + (i + 1));
                  });
              });
              if (task.contentType == "text") {
                taskELe
                  .find(".radio-item.check-text > input")
                  .prop("checked", true);
                taskELe
                  .find(".videoField.input-item")
                  .addClass("hide")
                  .removeClass("show");
                taskELe
                  .find(".videoField.input-item input.selectVideo")
                  .removeAttr("required");
                taskELe
                  .find(".textField.input-item")
                  .addClass("show")
                  .removeClass("hide");
                taskELe
                  .find(".textField.input-item textarea.textarea_input")
                  .attr("required", "required");
                taskELe.find("textarea.textarea_input").val(task.contentText);
              } else {
                taskELe
                  .find(".radio-item.check-video > input")
                  .prop("checked", true);
                taskELe
                  .find(".videoField.input-item")
                  .addClass("show")
                  .removeClass("hide");
                taskELe
                  .find(".videoField.input-item input.selectVideo")
                  .removeAttr("required");
                taskELe
                  .find(".textField.input-item textarea.textarea_input")
                  .removeAttr("required");
                taskELe
                  .find(".textField.input-item")
                  .addClass("hide")
                  .removeClass("show");
                //taskELe.find('input.selectVideo').val(item.contentUrl);
                taskELe.find("span.videoFileOnServer").text(task.contentUrl);
                taskELe
                  .find("span.videoFileOnServer")
                  .attr("duration", task.duration);
              }
            });
          });
        } else {
          $(".cm-exercise-listing").append(exerciseItemEle);
          $(".cm-exercise-listing .homework-tasks-listing").append(
            exerciseTaskItemEle
          );

          $(".exercise-title").val(`Exercise ${lastHomeWork}`);
        }
        let totalHomeWorkTime = res.data.lessonData[0].homeWorktotalTime;
        let tHWT = fromSeconds(totalHomeWorkTime);
        let tHWTinMin = tHWT.mins;
        let tHWTinSecond = tHWT.seconds;
        $(".total-homework-duration input.min-duration").val(tHWTinMin);
        $(".total-homework-duration input.second-duration").val(tHWTinSecond);
        console.log("totalHomeWorkTime", totalHomeWorkTime);
        $("h2#cm_lesson_title")
          .text(lessonTitle)
          .attr("data-lessonid", lessonId)
          .attr("data-lastlesson", lastHomeWork);
        $(".add-homework-modal").fadeIn();
        $("body").addClass("homework-pop-open");
        console.log("res", lastHomeWork);

        wrapForm();
      },
      error: function () {
        alert("Something went wrong!");
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
      },
    });

    isHomeWorkEditHome = true;
    directAdd = 1;
  });

  $(window).on("hashchange", function () {
    //alert('abc')
    console.log(window.location.hash);
    if (
      $(".add-homework-modal").is(":visible") &&
      window.location.hash.length < 1
    ) {
      $(".add-homework-modal").fadeOut();
    }
    if (window.prevLocationHash == "#editRecording") {
      $("span.cm-recording-close-icon").trigger("click");
    }

    if (window.prevLocationHash == "#viewRecording") {
      $("span.cm-view-recording-close-icon").trigger("click");
    }

    if (window.prevLocationHash == "#addRecordingBtn") {
      $("span.cm-recording-close-icon").trigger("click");
    }

    if (window.prevLocationHash == "#viewLesson") {
      $("span.cm-view-lesson-close-icon").trigger("click");
    }

    if (window.prevLocationHash == "#viewQuestion") {
      $("span.close-ques-modal").trigger("click");
    }

    if (window.prevLocationHash == "#userrecording") {
      window.location.reload();
    }
    if (window.prevLocationHash == "#editQuestion") {
      $(".popupOverlay").trigger("click");
    }

    if (window.prevLocationHash == "#addQuestion") {
      $(".popupOverlay").trigger("click");
    }

    if (window.prevLocationHash == "#viewUser") {
      $("span.cm-close-icon").trigger("click");
    }

    if (window.prevLocationHash == "#editLesson") {
      $(".cm-close-icon").trigger("click");
      setHashUrl("#viewLesson");
    }
    if (window.prevLocationHash == "#addHomeWork") {
      $(".cm-homework-close-icon").trigger("click");
      setHashUrl("#addLesson");
    }

    if (window.prevLocationHash == "#addLesson") {
      $(".cm-close-icon").trigger("click");
    }

    window.prevLocationHash = window.location.hash;
  });

  $(document).on("click", "#addHomeWork", function () {
    wrapForm();
    let filled = true;
    $("#save_lesson_form [required]").each(function () {
      console.log($(this).val());
      if ($(this).val() == "") {
        filled = false;
      }
    });
    if (filled == true) {
      directAdd = 0;
      let lessonTitlePrev = $("h2#new_lesson_name").attr("data-sortorder");
      let lessonTitle = $("#new_lesson_name_input").val();
      $(".cm-exercise-listing").html(exerciseItem);
      $("h2#cm_lesson_title")
        .text(lessonTitle)
        .attr("data-lastlesson", 1)
        .attr("data-sortorder", lessonTitlePrev.trim().replace("Lesson ", ""));
      $(".add-homework-modal").fadeIn();
      $("body").addClass("homework-pop-open");
    } else {
      alert("Please fill all the input fields");
    }
    setHashUrl("#addHomeWork");
  });

  $(document).on("click", "span.cm-homework-close-icon", function () {
    directAdd = 0;
    $(".add-homework-modal").fadeOut();
    $("body").removeClass("homework-pop-open");
    $("body").removeClass("edit_mode_active");
    $("body").removeClass("cm_pop_open");
    getOriginalUrl();
  });
  $(document).on(
    "change",
    ".homework-tasks-item .radio-item >input",
    function () {
      let parentEle = $(this).closest(".homework-tasks-item");
      let itsVal = $(this).val();
      $(this).addClass("active");
      $(this)
        .closest(".radio-groups")
        .find("input")
        .not($(this))
        .removeClass("active");
      if (itsVal == "video") {
        parentEle
          .find(".videoField.input-item")
          .removeClass("hide")
          .addClass("show");
        parentEle
          .find(".textField.input-item")
          .removeClass("show")
          .addClass("hide");
        parentEle
          .find(".textField.input-item > textarea")
          .removeAttr("required");
        parentEle
          .find(".videoField.input-item > input")
          .attr("required", "required");
      } else {
        parentEle
          .find(".textField.input-item")
          .removeClass("hide")
          .addClass("show");
        parentEle
          .find(".videoField.input-item")
          .removeClass("show")
          .addClass("hide");
        parentEle
          .find(".textField.input-item > textarea")
          .attr("required", "required");
        parentEle.find(".videoField.input-item > input").removeAttr("required");
      }
    }
  );

  $(document).on("click", "a.add_new_exercise_task", function (e) {
    e.preventDefault();
    let exerciseItem = $(this).closest(".cm-exercise-item");
    let exerciseItemPos = exerciseItem.index() + 1;
    $(homeworkItem).appendTo(exerciseItem.find(".homework-tasks-listing"));
    let itemCount = exerciseItem.find(".homework-tasks-item").length;
    let parentEle = exerciseItem.find(".homework-tasks-item").eq(itemCount - 1);
    parentEle.find("input.homework_name_input").val(`Task ${itemCount}`);
    parentEle
      .find(".radio-item.check-text > input")
      .attr("id", `homework_excercise_${exerciseItemPos}_txt_${itemCount}`);
    parentEle
      .find(".radio-item.check-text > label")
      .attr("for", `homework_excercise_${exerciseItemPos}_txt_${itemCount}`);
    parentEle
      .find(".radio-item.check-video > input")
      .attr("id", `homework_excercise_${exerciseItemPos}_vid_${itemCount}`);
    parentEle
      .find(".radio-item.check-video > label")
      .attr("for", `homework_excercise_${exerciseItemPos}_vid_${itemCount}`);
    parentEle
      .find(".radio-item > input")
      .attr("name", `homework_excercise_${exerciseItemPos}_type_${itemCount}`);
    exerciseItem
      .find(".homework-tasks-item:last-child input[type=radio].active")
      .prop("checked", true);
  });

  $(document).on("click", "a.remove_exercise_task", function (e) {
    e.preventDefault();
    let exerciseItem = $(this).closest(".cm-exercise-item");
    let exerciseItemPos = exerciseItem.index() + 1;
    let parentEle = $(this).closest(".homework-tasks-item");
    parentEle.remove();
    exerciseItem.find(".homework-tasks-item").each(function () {
      let itSelf = $(this);
      let itemIndex = itSelf.index() + 1;
      //itSelf.find("input.homework_name_input").val(`Task ${itemIndex}`);
      itSelf
        .find(".radio-item.check-text > input")
        .attr("id", `homework_excercise_${exerciseItemPos}_txt_${itemIndex}`);
      itSelf
        .find(".radio-item.check-text > label")
        .attr("for", `homework_excercise_${exerciseItemPos}_txt_${itemIndex}`);
      itSelf
        .find(".radio-item.check-video > input")
        .attr("id", `homework_excercise_${exerciseItemPos}_vid_${itemIndex}`);
      itSelf
        .find(".radio-item.check-video > label")
        .attr("for", `homework_excercise_${exerciseItemPos}_vid_${itemIndex}`);
      itSelf
        .find(".radio-item > input")
        .attr(
          "name",
          `homework_excercise_${exerciseItemPos}_type_${itemIndex}`
        );
    });
  });

  $(document).on("click", "a.remove_exercise_btn", function (e) {
    e.preventDefault();
    //let exerciseItemPos = exerciseItem.index() + 1;
    let parentEle = $(this).closest(".cm-exercise-item");
    parentEle.remove();
    // exerciseItem
    //   .find(".exercise-tasks-item")
    //   .each(function() {
    //     let itSelf = $(this);
    //     let itemIndex = itSelf.index() + 1;
    //     itSelf.find("input.homework_name_input").val(`Task ${itemIndex}`);
    //     itSelf
    //       .find(".radio-item.check-text > input")
    //       .attr("id", `homework_excercise_${exerciseItemPos}_txt_${itemIndex}`);
    //     itSelf
    //       .find(".radio-item.check-text > label")
    //       .attr("for", `homework_excercise_${exerciseItemPos}_txt_${itemIndex}`);
    //     itSelf
    //       .find(".radio-item.check-video > input")
    //       .attr("id", `homework_excercise_${exerciseItemPos}_vid_${itemIndex}`);
    //     itSelf
    //       .find(".radio-item.check-video > label")
    //       .attr("for", `homework_excercise_${exerciseItemPos}_vid_${itemIndex}`);
    //     itSelf
    //       .find(".radio-item > input")
    //       .attr("name", `homework_excercise_${exerciseItemPos}_type_${itemIndex}`);
    //   });
  });

  $(document).on("click", "a.add_new_exercise", function (e) {
    e.preventDefault();
    $(exerciseItem).appendTo(".cm-exercise-listing");
    let itemCount = $(".cm-exercise-item").length;
    let parentEle = $(".cm-exercise-item").eq(itemCount - 1);
    let lastExersizeCount = Number(
      $("h2#cm_lesson_title").attr("data-lastlesson")
    );
    parentEle.find(".exercise-title").val(`Exercise ${lastExersizeCount + 1}`);
    parentEle.find("input.homework_name_input").val(`Task 1`);
    parentEle
      .find(".radio-item.check-text > input")
      .attr("id", `homework_excercise_${itemCount}_txt_1`);
    parentEle
      .find(".radio-item.check-text > label")
      .attr("for", `homework_excercise_${itemCount}_txt_1`);
    parentEle
      .find(".radio-item.check-video > input")
      .attr("id", `homework_excercise_${itemCount}_vid_1`);
    parentEle
      .find(".radio-item.check-video > label")
      .attr("for", `homework_excercise_${itemCount}_vid_1`);
    parentEle
      .find(".radio-item > input")
      .attr("name", `homework_excercise_${itemCount}_type_${itemCount}`);
    // $(`.homework-tasks-item input[type=radio].active`).prop("checked", true);
    $("h2#cm_lesson_title").attr("data-lastlesson", lastExersizeCount + 1);
  });

  // Add HomeWorks

  function toSeconds(mins, seconds) {
    let totalSeconds = mins * 60 + seconds;
    return totalSeconds;
  }

  let isHomeWorkEditHome = false;
  $(document).on("submit", "#save_homework_form", function (e) {
    e.preventDefault();
    // $("body").addClass("loading");
    $(".max-loader-overlay").fadeIn();
    let lessonSortOrder = $("h2#new_lesson_name").attr("data-sortorder");
    let lessonName = $("#new_lesson_name_input").val();
    let lessonContent = [];
    let homeworks = [];
    console.log("directAdd-", directAdd);
    let totalHomeWorkTimeMin = Number(
      $(".total-homework-duration input.min-duration").val()
    );
    let totalHomeWorkTimeSec = Number(
      $(".total-homework-duration input.second-duration").val()
    );

    let totalHomeWorkTime = toSeconds(
      totalHomeWorkTimeMin,
      totalHomeWorkTimeSec
    );
    if (directAdd == 0) {
      // $("body").addClass("loading");
      $(".max-loader-overlay").fadeIn();
      let lessonName = $("#new_lesson_name_input").val();
      let lessonContent = [];
      let contentOrder = 1;
      let lessonMinsDuration = Number(
        $(".lesson-duration input.min-duration").val()
      );
      let lessonSecondsDuration = Number(
        $(".lesson-duration input.second-duration").val()
      );
      let lessonsDuration = toSeconds(
        lessonMinsDuration,
        lessonSecondsDuration
      );

      $(".lesson-tasks-item").each(function () {
        let taskObject = {};
        let contentType = $(this).find(".radio-item input:checked").val();
        let textContent = $(this).find("textarea.textarea_input").val();
        if (contentType == "text" && textContent.length > 0) {
          taskObject = {
            contentText: textContent,
            //duration:  Number(itsDuration),
            contentOrder: contentOrder,
            contentType: "text",
            isDeleted: false,
          };
          contentOrder++;
          lessonContent.push(taskObject);
        }
        let videoFileUrl = $(this).find(".videoFileOnServer").text();
        let videoFileDuration = $(this)
          .find(".videoFileOnServer")
          .attr("duration");
        if (contentType == "video" && videoFileUrl.length > 10) {
          taskObject = {
            contentUrl: videoFileUrl,
            duration: Number(videoFileDuration),
            contentOrder: contentOrder,
            contentType: "video",
            isDeleted: false,
          };
          lessonContent.push(taskObject);
          contentOrder++;
        }
      });
      let lessonOrder = Number(lessonSortOrder);
      $.ajax({
        type: "POST",
        url: "/admin/saveLessons",
        data: {
          lessonName: lessonName,
          sortOrder: lessonOrder,
          totalTime: lessonsDuration,
          lessonContent: lessonContent,
          homeWorktotalTime: totalHomeWorkTime,
        },
        success: function (res) {
          $(".add-lesson-modal").fadeOut();
          // $("body").removeClass("loading");
          $(".max-loader-overlay").fadeOut();
          $("body").removeClass("popupOpen");
          let lessonId = res.data.lessonId;
          console.log("lessonId-", lessonId);
          $(".cm-exercise-item").each(function () {
            let contentOrder = 1;
            let homeworkDetail = [];
            let minsDuration = Number(
              $(this).find(".exercise-duration input.min-duration").val()
            );
            let secondsDuration = Number(
              $(this).find(".exercise-duration input.second-duration").val()
            );
            let itsDuration = toSeconds(minsDuration, secondsDuration);
            let exerciseName = $(this).find(".exercise-title").val();
            $(this)
              .find(".homework-tasks-item")
              .each(function () {
                let taskObject = {};

                let contentType = $(this)
                  .find(".radio-item input:checked")
                  .val();
                let textContent = $(this).find("textarea.textarea_input").val();
                if (contentType == "text" && textContent.length > 0) {
                  taskObject = {
                    contentText: textContent,
                    //duration:  Number(itsDuration),
                    contentOrder: contentOrder,
                    contentType: "text",
                    isDeleted: false,
                  };
                  contentOrder++;
                  homeworkDetail.push(taskObject);
                }

                let videoFileUrl = $(this).find(".videoFileOnServer").text();
                let videoFileDuration = $(this)
                  .find(".videoFileOnServer")
                  .attr("duration");
                if (contentType == "video" && videoFileUrl.length > 10) {
                  taskObject = {
                    contentUrl: videoFileUrl,
                    duration: Number(videoFileDuration),
                    contentOrder: contentOrder,
                    contentType: "video",
                    isDeleted: false,
                  };
                  homeworkDetail.push(taskObject);
                  contentOrder++;
                }
              });
            let homeWorkItem = {
              name: exerciseName,
              totalTime: Number(itsDuration),
              homeworkDetail: homeworkDetail,
            };
            homeworks.push(homeWorkItem);
          });
          let finalData = {
            homework: homeworks,
            homeWorktotalTime: totalHomeWorkTime,
          };

          $.ajax({
            type: "POST",
            url: `/admin/addHomework/${lessonId}`,
            data: finalData,
            success: function (res) {
              $(".add-lesson-modal").fadeOut();
              // $("body").removeClass("loading");
              $(".max-loader-overlay").fadeOut();
              $("body").removeClass("popupOpen");
              window.location.href = "/admin/getLessons";
              console.log("res", res);
            },
            error: function (msg) {
              alert("msg", msg.responseJSON.message);
              console.log("msg", msg);
              // $("body").removeClass("loading");
              $(".max-loader-overlay").fadeOut();
            },
          });
        },
        error: function (msg) {
          alert("msg", msg.responseJSON.message);
          console.log("msg", msg.responseJSON.message);
          // $("body").removeClass("loading");
          $(".max-loader-overlay").fadeOut();
        },
      });
    } else {
      let lessonId = $("h2#cm_lesson_title").attr("data-lessonid");
      $(".cm-exercise-item").each(function () {
        let exerciseID = $(this).find(".exercise-title").attr("data-id");
        let contentOrder = 1;
        let homeworkDetail = [];
        let minsDuration = Number(
          $(this).find(".exercise-duration input.min-duration").val()
        );
        let secondsDuration = Number(
          $(this).find(".exercise-duration input.second-duration").val()
        );
        let itsDuration = toSeconds(minsDuration, secondsDuration);
        let exerciseName = $(this).find(".exercise-title").val();
        $(this)
          .find(".homework-tasks-item")
          .each(function () {
            let taskObject = {};
            //let minsDuration = Number($(this).find('input.min-duration').val());
            //let secondsDuration = Number($(this).find('input.second-duration').val());
            //let itsDuration = toSeconds(minsDuration,secondsDuration);
            let contentType = $(this).find(".radio-item input:checked").val();
            let textContent = $(this).find("textarea.textarea_input").val();
            if (contentType == "text" && textContent.length > 0) {
              taskObject = {
                contentText: textContent,
                //duration:  Number(itsDuration),
                contentOrder: contentOrder,
                contentType: "text",
                isDeleted: false,
              };
              contentOrder++;
              homeworkDetail.push(taskObject);
            }
            let videoFileUrl = $(this).find(".videoFileOnServer").text();
            let videoFileDuration = $(this)
              .find(".videoFileOnServer")
              .attr("duration");
            if (contentType == "video" && videoFileUrl.length > 10) {
              taskObject = {
                contentUrl: videoFileUrl,
                duration: Number(videoFileDuration),
                contentOrder: contentOrder,
                contentType: "video",
                isDeleted: false,
              };
              homeworkDetail.push(taskObject);
              contentOrder++;
            }
          });

        let homeWorkItem = {
          name: exerciseName,
          _id: exerciseID,
          totalTime: Number(itsDuration),
          homeworkDetail: homeworkDetail,
        };
        homeworks.push(homeWorkItem);
      });
      let finalData = {
        homework: homeworks,
        homeWorktotalTime: totalHomeWorkTime,
      };

      $.ajax({
        type: "POST",
        url: `/admin/addHomework/${lessonId}`,
        data: finalData,
        success: function (res) {
          $(".add-lesson-modal").fadeOut();
          // $("body").removeClass("loading");
          $(".max-loader-overlay").fadeOut();
          $("body").removeClass("popupOpen");
          window.location.href = "/admin/getLessons";
          console.log("res", res);
        },
        error: function () {
          alert("Something went wrong!");
          // $("body").removeClass("loading");
          $(".max-loader-overlay").fadeOut();
        },
      });
    }
  });

  $("a.add_frequency").click(function (e) {
    e.preventDefault();
    $("body").addClass("frequency_open");
  });

  /*==== View Lessons =====*/
  let lessonTaskItem = $(".view-task-listing").html();
  let exerciseTaskItem = $(".view-exercise-task-listing").html();
  $(".view-exercise-task-listing").html("");
  let viewExerciseItem = $(".view-exercise-listing").html();

  $("span.cm-view-lesson-close-icon").click(function () {
    $(".view-lesson-modal").fadeOut();
    getOriginalUrl();
  });
  let lessonDetailsss;
  $(document).on("click", "a.view-lesson-btn", function (e) {
    e.preventDefault();
    $("a.view-lesson-btn").removeClass("clicked");
    $("body").addClass("cm_pop_open");
    $(this).addClass("clicked");
    setHashUrl("#viewLesson");
    $(".view-task-listing").html("");
    $(".view-exercise-listing").html("");
    // $("body").addClass("loading");
    $(".max-loader-overlay").fadeIn();
    e.preventDefault();
    let itsUrl = $(this).attr("data-href");
    $.ajax({
      type: "GET",
      url: itsUrl,
      success: function (res) {
        let lessonData = res.data.lessonData;
        window.lessonData = lessonData;
        lessonDetailsss = lessonData[0];
        $("h1#lessonName")
          .text(lessonData[0].name)
          .attr("data-sortorder", lessonDetailsss.sortOrder);
        let totalSeconds1 = lessonData[0].totalTime;
        let getDuration1 = fromSeconds(totalSeconds1);
        let mins1 = getDuration1.mins;
        let seconds1 = getDuration1.seconds;
        $(".view_lesson_duration_val").text(
          `${mins1} Mins ${seconds1} seconds`
        );
        lessonData[0].lessonDetails.forEach(function (task, index) {
          $(".view-task-listing").append(lessonTaskItem);
          let taskItem = $(".view-task-listing > .view-task-item").eq(index);
          taskItem.find(".cm-task-name").text(`Task ${index + 1}`);
          taskItem.find(".view-content-type").text(`${task.contentType}`);
          //let totalSeconds = task.duration;
          //let getDuration = fromSeconds(totalSeconds);
          //let mins = getDuration.mins;
          //let seconds = getDuration.seconds;
          //taskItem.find('.view-duration').text(`${mins} Mins : ${seconds} seconds`);
          taskItem.find("span.view-content-video").text(`${task.contentText}`);
          if (task.contentText) {
            taskItem
              .find("span.view-content-video")
              .text(`${task.contentText}`);
          } else {
            taskItem.find("span.view-content-video").text(`${task.contentUrl}`);
            taskItem
              .find("span.view-content-video")
              .attr("duration", `${task.duration}`);
          }
        });
        if (lessonData[0].homework.length > 0) {
          $(".view-exercise-listing-wrapper").fadeIn();
          lessonData[0].homework.forEach(function (exercise, index) {
            $(".view-exercise-listing").append(viewExerciseItem);
            let excerciseItemEle = $(".view-exercise-listing > div").eq(index);
            excerciseItemEle.find("h3.cm-exercise-name").text(exercise.name);
            let totalSeconds = exercise.totalTime;
            let getDuration = fromSeconds(totalSeconds);
            let mins = getDuration.mins;
            let seconds = getDuration.seconds;
            excerciseItemEle
              .find(".view_lesson_exercise_duration_val")
              .text(`${mins} Mins ${seconds} seconds`);
            exercise.homeworkDetail.forEach(function (task, index) {
              excerciseItemEle
                .find(".view-exercise-task-listing")
                .append(exerciseTaskItem);
              let taskItem = excerciseItemEle
                .find(".view-exercise-task-item")
                .eq(index);
              taskItem.find(".cm-exercise-task-name").text(`Task ${index + 1}`);
              taskItem.find(".view-content-type").text(`${task.contentType}`);
              //taskItem.find('.view-duration').text(`${task.duration}`)
              if (task.contentText) {
                taskItem
                  .find("span.view-content-video")
                  .text(`${task.contentText}`);
              } else {
                taskItem
                  .find("span.view-content-video")
                  .text(`${task.contentUrl}`);
                taskItem
                  .find("span.view-content-video")
                  .attr("duration", `${task.duration}`);
              }
            });
          });
        }
        $(".view-lesson-modal").fadeIn();
        $(".max-loader-overlay").fadeOut();
        // $("body").removeClass("loading");
      },
      error: function () {
        alert("Something went wrong!");
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
      },
    });
  });

  $("span#edit-lesson").click(function () {
    wrapForm();
    setHashUrl("#editLesson");
    $(".lesson-tasks-listing").html("");
    $(".add-lesson-modal").fadeIn();
    $("body").addClass("edit-mode");
    console.log("lessonDetailsss", lessonDetailsss);
    $("h2#new_lesson_name").attr("data-sortorder", lessonDetailsss.sortOrder);
    $("input#new_lesson_name_input").val(lessonDetailsss.name);
    let duration = fromSeconds(lessonDetailsss.totalTime);
    let mins = duration.mins;
    let seconds = duration.seconds;
    $(".input-item.duration-item.lesson-duration")
      .find("input.min-duration")
      .val(mins);
    $(".input-item.duration-item.lesson-duration")
      .find("input.second-duration")
      .val(seconds);
    lessonDetailsss.lessonDetails.forEach(function (item, index) {
      $(".lesson-tasks-listing").append(lessonItem);
      setTimeout(function () {
        let taskELe = $(".lesson-tasks-listing > .lesson-tasks-item").eq(index);
        taskELe.find("input.task_name_input").val(`Task ${item.contentOrder}`);
        taskELe
          .find(".radio-item.check-text > input")
          .attr("id", `txt${index + 1}`);
        taskELe
          .find(".radio-item.check-text > input")
          .attr("name", `type-${index + 1}`);
        taskELe
          .find(".radio-item.check-video > input")
          .attr("name", `type-${index + 1}`);
        taskELe
          .find(".radio-item.check-text > label")
          .attr("for", `txt${index + 1}`);
        taskELe
          .find(".radio-item.check-video > input")
          .attr("id", `vid${index + 1}`);
        taskELe
          .find(".radio-item.check-video > label")
          .attr("for", `vid${taskELe + 1}`);
        taskELe.find(".radio-item > input").prop("checked", false);
        if (item.contentType == "text") {
          taskELe.find(".radio-item.check-text > input").prop("checked", true);
          taskELe
            .find(".videoField.input-item")
            .addClass("hide")
            .removeClass("show");
          taskELe
            .find(".videoField.input-item input.selectVideo")
            .removeAttr("required");
          taskELe
            .find(".textField.input-item")
            .addClass("show")
            .removeClass("hide");
          taskELe
            .find(".textField.input-item textarea.textarea_input")
            .attr("required", "required");
          taskELe.find("textarea.textarea_input").val(item.contentText);
        } else {
          taskELe.find(".radio-item.check-video > input").prop("checked", true);
          taskELe
            .find(".videoField.input-item")
            .addClass("show")
            .removeClass("hide");
          taskELe
            .find(".videoField.input-item input.selectVideo")
            .removeAttr("required");
          taskELe
            .find(".textField.input-item textarea.textarea_input")
            .removeAttr("required");
          taskELe
            .find(".textField.input-item")
            .addClass("hide")
            .removeClass("show");
          //taskELe.find('input.selectVideo').val(item.contentUrl);
          taskELe.find("span.videoFileOnServer").text(item.contentUrl);
          taskELe
            .find("span.videoFileOnServer")
            .attr("duration", item.duration);
        }
      }, 50);
    });
  });

  let questionDetail;
  let optionHTML = $(".cm-que-option-listing").html();
  $(".cm-que-option-listing").html("");
  $("a.view-ques-btn").click(function (e) {
    e.preventDefault();
    $(".cm-que-option-listing").html("");
    // $("body").addClass("loading");
    $(".max-loader-overlay").fadeIn();
    setHashUrl("#viewQuestion");
    let quesID = $(this).closest("tr").attr("data-id");
    let itsAPiUrl = $(this).attr("href");
    $.ajax({
      type: "GET",
      url: itsAPiUrl,
      success: function (data) {
        let getData = data.data[0];
        console.log("data-", getData);
        questionDetail = getData;
        window.questionDetail = getData;
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
        $("#cm-que-title").text(getData.question).attr("data-id", quesID);
        $(".question-modal").fadeIn();
        $("#screen").text(getData.screen);
        $("#questionOrder").text(getData.questionOrder);
        $("#maxAllowedAnswers").text(getData.maxAllowedAnswers);
        $("#questionType").text(getData.questionType);
        let itemCount = 0;
        getData.questionOptions.forEach(function (item, index) {
          if (item.value.length > 0) {
            $(optionHTML).appendTo(".cm-que-option-listing");
            let optionELe = $(".cm-que-option-listing > div").eq(itemCount);
            optionELe.find("p").text(item.value);
            itemCount++;
          }
        });
      },
    });
  });

  $("span.close-ques-modal").click(function () {
    $(".question-modal").fadeOut();
    $("body").removeClass("que-edit-active");
    getOriginalUrl();
  });

  $(document).on("click", ".maxuserrecording", function (e) {
    var link = $(this).attr("data-link");
    $(".max-loader-overlay").fadeIn();
    var bodyData = $("body").html();
    setHashUrl("#userrecording");
    if (window.location.hash == "#userrecording") {
      fetch(link)
        .then((response) => response.text())
        .then((data) => {
          $(".max-loader-overlay").fadeOut();
          var alldata = data;
          $("body").html(alldata);
        });
    }
  });
  $(document).on("click", "span.user-rec-close", function (e) {
    var n = window.location.href.replace(window.location.hash, "");
    window.location.href = n;
  });
  $(document).on("click", "td.recname a", function (e) {
    e.preventDefault();
    var content = $(this).parent().next().html();
    $(".usercontent-popup").fadeIn();
    $(".usercontent-popup .content").html(content);
  });

  $(document).on("click", ".usercontent-popup .close-modal", function (e) {
    $(".usercontent-popup").fadeOut();
  });

  $("button#addQueBtn").click(function () {
    setHashUrl("#addQuestion");
  });
  $(".popupOverlay").click(function () {
    getOriginalUrl();
  });

  $("form#addQuestionForm:empty")
    .nextAll("div")
    .wrapAll('<form id="addQuestionForm"></form>');
  $("form#addQuestionForm:empty").remove();
  $("span#edit_que_btn").click(function () {
    let question = questionDetail.question;
    let questionType = questionDetail.questionType;
    let minimumValue = questionDetail.minimumValue;
    let maxAllowedAnswers = questionDetail.maxAllowedAnswers;
    let maxCharacter = questionDetail.maxCharacter;
    let screen = questionDetail.screen;
    let questionOrder = questionDetail.questionOrder;
    let maximumValue = questionDetail.maximumValue;
    let midValue = questionDetail.midValue;
    let questionOptions = questionDetail.questionOptions;
    window.editMode = true;
    window.quesID = $("h2#cm-que-title").attr("data-id");
    $("form#addQuestionForm:empty")
      .nextAll("div")
      .wrapAll('<form id="addQuestionForm"></form>');
    $("form#addQuestionForm:empty").remove();
    $("span.close-ques-modal").trigger("click");
    setHashUrl("#editQuestion");
    $("body").addClass("que-edit-active");
    $("button#addQueBtn").trigger("click");
    setTimeout(function () {
      $("input#ques").val(question);
      $("select#quesType").val(questionType);
      $("input#maxAns").val(maxAllowedAnswers);
      $("input#maxChar").val(maxCharacter);
      $("input#screen").val(screen);
      $("input#quesOrder").val(questionOrder);
      $("select#quesType").trigger("change");
      $("input#minValue").val(minimumValue);
      $("input#maxValue").val(maximumValue);
      $("input#minValue").val(minimumValue);
      $("input#midValue").val(midValue);
      $("input#quesOrder").val(questionOrder);
      if (questionOptions && questionOptions.length > 0) {
        let itmsCount = questionOptions.length;
        questionOptions.forEach(function (item, index) {
          if (index > 0) {
            $("span.add").trigger("click");
          }
          let optionELE = $(".fieldWrapper.multipleOptions .optionWrapper").eq(
            index
          );
          optionELE.find('input[type="text"]').val(item.value);
          optionELE.find('input[type="file"]').attr("value", item.optionImg);
          optionELE.find("textarea").val(item.optionDesc);
        });
      }
    }, 100);
  });

  /*======= Recording Section ========*/

  $(".view_recording").click(function () {
    let parentEle = $(this).closest("tr.recording-item");
    let title = parentEle.attr("data-title");
    let order = parentEle.attr("data-order");
    let duration = parentEle.attr("data-duration");
    $(".view-recording-modal").fadeIn();
    let getDuration = fromSeconds(Number(duration));
    $("#recording_duration").text(
      `${getDuration.mins} mins, ${getDuration.seconds} seconds`
    );
    $("#recording_order").text(order);
    $("#recordingName").text(title);
  });

  $("span.cm-view-recording-close-icon").click(function () {
    $(".view-recording-modal").fadeOut();
    getOriginalUrl();
  });

  $("button#addRecordingBtn").click(function () {
    window.editRecording = false;
    let newTitle = $("input.recording-name").val();
    $("h2#new_recording_name").text(newTitle);
    $("input#min_duration_id").val("");
    $("input#second_duration_id").val("");
    $("textarea#textarea_input_id").val("");
    $(".add-recording-modal").fadeIn();
    let hashPath = $(this).attr("href");
    setHashUrl(hashPath);
  });

  $("span.cm-recording-close-icon").click(function () {
    $(".add-recording-modal").fadeOut();
    getOriginalUrl();
  });

  $("a.edit_recording").click(function () {
    window.editRecording = true;

    let parentEle = $(this).closest("tr.recording-item");
    let title = parentEle.attr("data-title");
    let content = parentEle.find("td.recording_content").text();
    let duration = parentEle.attr("data-duration");
    let recordId = parentEle.attr("data-id");
    window.recordId = recordId;
    $("h2#new_recording_name").text(`${title}`);
    let getDuration = fromSeconds(Number(duration));
    $("input#min_duration_id").val(getDuration.mins);
    $("input.recording-name").val(title);
    $("input#second_duration_id").val(getDuration.seconds);
    $("textarea#textarea_input_id").val(content);
    $(".add-recording-modal").fadeIn();
    setTimeout(function () {
      var textarea = document
        .querySelector(".add-recording-modal-inner")
        .querySelector(".textarea_input");
      textarea.style.minHeight = textarea.scrollHeight + "px";
    });
  });

  $("#save_recording_form").submit(function (e) {
    e.preventDefault();
    let newTitle = $(".recording-name").val();
    let content = $("textarea#textarea_input_id").val();
    let minsDuration = Number($("input#min_duration_id").val());
    let secondDuration = Number($("input#second_duration_id").val());
    let duration = toSeconds(minsDuration, secondDuration);
    let newTitleOrder = $("tr.recording-item").length + 1;
    let transFemaleMinFrequency = Number(
      $(".cm-gender-item.trans-female input.idealMinFrequency").val()
    );
    let transFemaleMaxFrequency = Number(
      $(".cm-gender-item.trans-female input.idealMaxFrequency").val()
    );

    let nonBinaryMinFrequency = Number(
      $(".cm-gender-item.non-binary input.idealMinFrequency").val()
    );
    let nonBinaryMaxFrequency = Number(
      $(".cm-gender-item.non-binary input.idealMaxFrequency").val()
    );

    let transMaleMinFrequency = Number(
      $(".cm-gender-item.trans-male input.idealMinFrequency").val()
    );
    let transMaleMaxFrequency = Number(
      $(".cm-gender-item.trans-male input.idealMaxFrequency").val()
    );

    let postData = {
      // "recordingId":"5e8c885de962d44fc91298da",

      recordingData: {
        recordingName: newTitle,
        content: content,
        contentType: "text",
        duration: duration,
        contentOrder: newTitleOrder,
        genderFrequencyData: [
          {
            gender: "Trans Female",
            idealMinFrequency: transFemaleMinFrequency,
            idealMaxFrequency: transFemaleMaxFrequency,
          },
          {
            gender: "Non-Binary",
            idealMinFrequency: nonBinaryMinFrequency,
            idealMaxFrequency: nonBinaryMaxFrequency,
          },
          {
            gender: "Trans Male",
            idealMinFrequency: transMaleMinFrequency,
            idealMaxFrequency: transMaleMaxFrequency,
          },
        ],
      },
    };
    console.log(postData);
    if (window.editRecording) {
      postData["recordingId"] = window.recordId;
    }

    $.ajax({
      type: "POST",
      url: "/admin/saveRecordings",
      data: postData,
      success: function (res) {
        $(".add-recording-modal").fadeOut();
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
        $("body").removeClass("popupOpen");
        location.reload();
        console.log("res", res);
      },
      error: function () {
        //alert("Something went wrong!");
        location.reload();
        // $("body").removeClass("loading");
        $(".max-loader-overlay").fadeOut();
      },
    });
  });
  /*==== Change Password ===*/

  $(document).ready(function () {
    $(".pass_show").append('<span class="ptxt">Show</span>');
  });

  $(document).on("click", ".pass_show .ptxt", function () {
    $(this).text($(this).text() == "Show" ? "Hide" : "Show");
    $(this)
      .prev()
      .attr("type", function (index, attr) {
        return attr == "password" ? "text" : "password";
      });
  });

  $("a#changePassword").click(function (e) {
    e.preventDefault();
    $("#overlay_change_pass, #changePassModal").fadeIn();
    $("body").addClass("change_pass_modal_open");
  });

  $("a#overlay_change_pass, span#cm_pass_close_icon").click(function () {
    $("#overlay_change_pass, #changePassModal").fadeOut();
    $("body").removeClass("change_pass_modal_open");
  });

  let minPassLength = 3;
  let maxPassLength = 8;
  $("#change_pass_form").submit(function (e) {
    e.preventDefault();
    let motifyMSG = "";
    let msgColor = "red";
    let charCountValidated;
    let confirmedPassValidated;
    let doChangePass;
    let currentPassVal = $("input#current_pass").val();
    let newPassVal = $("input#new_pass").val();
    let confirmedNewPassVal = $("input#confirmed_new_pass").val();

    /*==== Character count validation ====*/
    $(this)
      .find(".form-group input")
      .each(function () {
        let itsVal = $(this).val();
        if (itsVal.length < minPassLength || itsVal.length > maxPassLength) {
          motifyMSG = `Password strength should be min ${minPassLength} & max ${maxPassLength}`;
          msgColor = "red";
          charCountValidated = false;
          return false;
        } else {
          charCountValidated = true;
        }
      });

    /*==== New Pass & Confirm PassWord Validation ====*/
    if (charCountValidated) {
      if (newPassVal == confirmedNewPassVal) {
        confirmedPassValidated = true;
      } else {
        confirmedPassValidated = false;
        motifyMSG = `Password does not match.`;
        msgColor = "red";
      }
    }

    /*==== Current & New Password Validation ====*/
    if (confirmedPassValidated) {
      if (currentPassVal != confirmedNewPassVal) {
        doChangePass = true;
      } else {
        doChangePass = false;
        confirmedPassValidated = false;
        motifyMSG = `Current & New Password can not be same.`;
        msgColor = "red";
      }
    }

    if (doChangePass) {
      // $("body").addClass("loading");
      $(".max-loader-overlay").fadeIn();
      motifyMSG = `In Process`;
      msgColor = "Yellow";
      $.ajax({
        url: "/admin/changePassword",
        method: "POST",
        data: { oldPassword: currentPassVal, newPassword: newPassVal },
        success: function (data, status) {
          // $("body").removeClass("loading");
          $(".max-loader-overlay").fadeOut();
          console.log("success", data, status);
          motifyMSG = `Password changed successfully.`;
          msgColor = "Green";
          $("span#cm_response_msg")
            .text(motifyMSG)
            .show()
            .css("color", msgColor);
          setTimeout(function () {
            window.location.href = "/admin/logout";
          }, 250);
        },
        error: function (res) {
          // $("body").removeClass("loading");
          $(".max-loader-overlay").fadeOut();
          motifyMSG = res.responseJSON.message;
          msgColor = "red";
          console.log("motifyMSG", res);
          $("span#cm_response_msg")
            .text(motifyMSG)
            .show()
            .css("color", msgColor);
        },
      });
    }

    $("span#cm_response_msg").text(motifyMSG).show().css("color", msgColor);
  });

  $("a.add_frequency").click(function (e) {
    e.preventDefault();
    $(".max-loader-overlay").fadeIn();
    $("#gender_frequency_modal .cm-gender-listing").html("");
    $.ajax({
      url: "/admin/getAllGenderIdealFrequencies",
      method: "GET",
      success: function (data, status) {
        let genders = data.data;
        $(".max-loader-overlay").fadeOut();
        $("#gender_frequency_modal .cm-gender-listing").append(`

        <div class="add-gender-item-wrapper">
        <div class="cm-all-gender-item top">
 
        <div class="cm-gender-item-inner">
          <div class="cm-gender-name">
          <label>Gender Name</label>
          </div>
          <div class="cm-gender-max-frequency">
          <label>Ideal Max Frequency</label>
          </div>
          <div class="cm-gender-min-frequency">
          <label>Ideal Min Frequency</label>
          </div>
          <div class="cm-gender-action-frequency">
          <label>Actions</label>
          </div>
        </div>

      </div>
      `);
        genders.forEach(function (item) {
          let genderItem = `<div class="cm-all-gender-item datavalues" data-id=${item._id}>
          <form>
        <div class="cm-gender-item-inner">
          <div class="cm-gender-name">
          <span>${item.gender}</span>
          </div>
          <div class="cm-gender-max-frequency">
            <input type="text" class="max_ideal_frequency"value="${item.idealMaxFrequency}"></input>
          </div>
          <div class="cm-gender-min-frequency">
          <input type="text" class="min_ideal_frequency" value="${item.idealMinFrequency}">
          </div>
          <div class="cm-edit-button">
           <i class="fa fa-edit button" style="cursor:pointer"></i>
           <button style="display:none"><i class="fa fa-save button" style="cursor:pointer"></i></button>
           </div>
        </div>
        </form>
      </div>`;
          $(genderItem).appendTo("#gender_frequency_modal .cm-gender-listing");
        });
        $("body").addClass("frequency_open");
        $("#gender_frequency_modal").fadeIn();
      },
      error: function (res) {},
    });
  });

  $("span.close-frequency-modal").click(function (e) {
    e.preventDefault();
    $("body").remove("frequency_open");
    $("#gender_frequency_modal").fadeOut();
  });
  $(document).on("submit", ".cm-all-gender-item.datavalues", function (e) {
    e.preventDefault();
  });

  // $(document).on("submit", 'form[data-role="save"]', function (e) {
  //   e.preventDefault();
  //   let formEle = $(this);
  //   let genderName = $(".cm-all-gender-item.datavalues .gendername").val();
  //   let idealMinFrequency = Number(
  //     $(".cm-all-gender-item.datavalues .min_ideal_frequency").val()
  //   );
  //   let idealMaxFrequency = Number(
  //     $(".cm-all-gender-item.datavalues .max_ideal_frequency").val()
  //   );

  //   let postData = {
  //     //"rowId":"5ebbfd608d7c2935443a8883",
  //     gender: genderName,
  //     idealMinFrequency: idealMinFrequency,
  //     idealMaxFrequency: idealMaxFrequency,
  //   };
  //   $.ajax({
  //     url: "/admin/saveGenderFrequency",
  //     method: "POST",
  //     data: postData,
  //     success: function (data, status) {
  //       let ids = data.data._id;
  //       formEle.parent().attr("data-id", ids);
  //       formEle.attr("data-role", "show");
  //       formEle.find('input[type="submit"]').attr("value", "Edit");
  //       formEle.find('input[type="text"]').attr("disabled", "disabled");
  //       formEle.find('input[type="text"]').attr("disabled", "disabled");
  //       setTimeout(function () {
  //         formEle.find("p.res").remove();
  //       }, 1000);
  //     },
  //     error: function (res) {},
  //   });
  // });

  $(".nav-sidebar .nav-item>.nav-link.notication-link").click(function (event) {
    event.preventDefault();
    $(this).toggleClass("open");
    $(this).next().slideToggle();
  });

  $(document).on("submit", 'form[data-role="edit"]', function (e) {
    e.preventDefault();
    console.log("edit");
    let formEle = $(this);
    let genderName = $(this).find(".cm-gender-name>span").text();
    let idealMinFrequency = Number($(this).find(".min_ideal_frequency").val());
    let idealMaxFrequency = Number($(this).find(".max_ideal_frequency").val());
    let ids = formEle.parent().data("id");
    let postData = {
      rowId: ids,
      idealMinFrequency: idealMinFrequency,
      idealMaxFrequency: idealMaxFrequency,
    };
    $.ajax({
      url: "/admin/saveGenderFrequency",
      method: "POST",
      data: postData,
      success: function (data, status) {
        // formEle.attr("data-role", "show");
        // formEle.find('input[type="submit"]').attr("value", "Edit");
      },
      error: function (res) {},
    });
  });

  // $(document).on("submit", 'form[data-role="show"]', function (e) {
  //   e.preventDefault();
  //   let formEle = $(this);
  //   formEle.attr("data-role", "edit");
  //   formEle.find('input[type="submit"]').attr("value", "Save");
  //   formEle.find('input[type="text"]').removeAttr("disabled");
  // });
  $(document).on(
    "click",
    ".cm-all-gender-item.datavalues i.fa.fa-edit.button",
    function (e) {
      var parentele = $(this).closest(".cm-all-gender-item.datavalues");
      parentele.find("form").attr("data-role", "edit");
      parentele.find("input").addClass("addborder");
      parentele.find(".cm-edit-button i.fa.fa-edit.button").hide();
      parentele.find(".cm-edit-button button").show();
    }
  );
  $(document).on(
    "click",
    ".cm-all-gender-item.datavalues i.fa.fa-save.button",
    function (e) {
      var parentele = $(this).closest(".cm-all-gender-item.datavalues");
      parentele.find("input").removeClass("addborder");
      parentele.find(".cm-edit-button i.fa.fa-edit.button").show();
      parentele.find(".cm-edit-button button").hide();
    }
  );
})(jQuery);
