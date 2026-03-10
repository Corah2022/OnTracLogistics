(function ($) {
  const stars = document.querySelectorAll('.star-container a[id^="star"]');

  const surveyFeedback = document.getElementById("surveyFeedback");

  const trackingNum = new URLSearchParams(window.location.search).get("number");

  let rating = 0;

  let hoveredRating = 0;

  function updateStars() {
    for (let i = 0; i < stars.length; i++) {
      if (i < rating) {
        stars[i].innerHTML = "&#9733;";
      } else {
        stars[i].innerHTML = "&#9734;";
      }

      if (i < hoveredRating) {
        stars[i].classList.add("hover");
      } else {
        stars[i].classList.remove("hover");
      }
    }
  }

  function showStarRating() {
    const starRatingContainer = document.querySelector(".star-container");

    starRatingContainer.style.display = "flex";
  }

  function fadeOutStars() {
    for (let i = 0; i < stars.length; i++) {
      stars[i].style.opacity = 0;

      stars[i].style.display = "none";
    }
  }

  function fadeInSurveyFeedback() {
    surveyFeedback.style.opacity = 1;

    surveyFeedback.style.display = "inline-block";
  }

  function showStarRatingConditionally(firstEventCode) {
    const currentTime = new Date().getSeconds();

    const eventCodesForRating = ["DN", "DLVD", "CL", "DW", "OK", "FOTO"];

    if (eventCodesForRating.includes(firstEventCode) && currentTime % 1 === 0) {
      showStarRating();
    }
  }

  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      hoveredRating = index + 1;

      updateStars();
    });

    star.addEventListener("mouseout", () => {
      hoveredRating = rating;

      updateStars();
    });

    star.addEventListener("click", () => {
      if (rating === index + 1) {
        rating = 0;

        hoveredRating = 0;
      } else {
        rating = index + 1;

        hoveredRating = rating;
      }

      updateStars();

      fadeOutStars();

      fadeInSurveyFeedback();

      // Construct the event_label

      const eventLabel = rating + " Star Rating";

      // Send click event and custom dimension to Google Analytics

      gtag("event", "service_feedback", {
        event_category: "Service Feedback",

        event_label: eventLabel,

        tracking_number: trackingNum,
      });
    });
  });

  // Update Formstack links with the tracking number parameter

  const formLinks = document.querySelectorAll(".star-container a");

  formLinks.forEach((link) => {
    const field145237330 = link

      .getAttribute("href")

      .replace("field145237330=", `field145237330=${trackingNum}`);

    link.setAttribute("href", field145237330);
  });

  // Hide survey feedback initially

  surveyFeedback.style.opacity = 0;

  surveyFeedback.style.display = "none";

  if ($("#js-track-page").length > 0) {
    if (window.location.href.indexOf("number") > -1) {
      let url = new URL(window.location.href);

      let trackingNumber = url.searchParams.get("number");

      let $loader = $("#js-track-loader");

      // Check if trackingNumber is not empty

      if (!trackingNumber || trackingNumber.trim() === "") {
        $("#js-eyecatch").attr("style", "display: flex !important");

        $("#js-eyecatch").css("opacity", 1);

        $("#js-track-error-message").show();

        $("#js-track-error-message").text(
          "Please input the tracking number or contact the sender for assistance."
        );

        return;
      }

      $loader.show();

      function formatDate(dateString) {
        if (!dateString) {
          return "";
        }

        const parts = dateString.split("-");

        const year = parts[0].slice(-2);

        const month = parts[1];

        const day = parts[2].substr(0, 2);

        return `${month}/${day}/${year}`;
      }

      function formatTime(value) {
        if (!value) {
          return "";
        }

        const time = value.slice(11, 16);

        const hours = parseInt(time.slice(0, 2));

        const minutes = time.slice(3);

        const am_pm = hours >= 12 ? "PM" : "AM";

        const formattedHours = hours % 12 || 12;

        return `${formattedHours}:${minutes} ${am_pm}`;
      }

      $.ajax({
        // url: `https://devfastrac.ontrac.com/PackageServices/tracking/${trackingNumber}`,

        url: `https://webtrack.ontrac.com/PackageServices/tracking/${trackingNumber}`,

        headers: { "Content-Type": "application/x-www-form-urlencoded" },

        type: "GET",

        dataType: "json",

        success: function (data) {
          $loader.hide();

          data = data["Packages"][0];

          // NotifyMe Pieces

          const origin = data.Origin;

          const consignee = data.Consignee;

          const utcOrderPlaced = data.UtcOrderPlaced;

          document.getElementById("notify_tracking_number").value = data.number;

          document.getElementById("origin_city").value = origin.City;

          document.getElementById("destination_city").value = consignee.City;

          document.getElementById("utcorderplaced").value = utcOrderPlaced;

          // End NotifyMe Pieces

          let $trackProgress = $("#js-track-progress"),
            $trackStatusLabel = $("#js-track-status-label"),
            todaysDate = new Date(),
            arrivalDate = new Date(data["UtcDeliveryDateTime"]),
            firstEventCode = data["Events"][0]["EventCode"];

          showStarRatingConditionally(firstEventCode);

          data["EventFormatted"] = data["Events"][0]["Status"];

          data["EventShortDescriptionFormatted"] =
            data["Events"][0]["EventShortDescription"];

          data["EventLongDescriptionFormatted"] =
            data["Events"][0]["EventLongDescription"];

          let city = data["Events"][0]["City"];

          let state = data["Events"][0]["State"];

          if (city === null) {
            city = "";
          }

          if (state === null) {
            state = "";
          }

          let eventCityFormatted = "";

          if (city !== "" || state !== "") {
            eventCityFormatted = `${city}, ${state}`;
          }

          data["EventCityFormatted"] = eventCityFormatted;

          if (data["EventCityFormatted"] === "") {
            $("li")
              .filter(function () {
                return $("label", this).text() === "City";
              })

              .remove();
          } else {
            $("p[name='EventCityFormatted']").text(data["EventCityFormatted"]);
          }

          let formattedDate = formatDate(data.ExpectedDeliveryDate);

          data["EventLastDateFormatted"] = `${formatDate(
            data["Events"][0]["ZonedEventDateTime"]
          )} at ${formatTime(data["Events"][0]["ZonedEventDateTime"])}`;


          if (["XX", "EXRL", "XB", "NS", "None", ""].includes(firstEventCode)) {
            data["ExpectedDeliveryDateFormatted"] = "Pending";
          } else {
            data["ExpectedDeliveryDateFormatted"] = formatDate(
              data.ExpectedDeliveryDate
            );
          }

          let tenderedDate = data["TenderedDate"];

          if (tenderedDate === null) {
            data["TenderedDateFormatted"] = "";
          } else {
            data["TenderedDateFormatted"] = formatDate(tenderedDate);
          }

          if (data["TenderedDateFormatted"] === "") {
            $(".track-block__details-block span").remove();
          } else {
            $("span[name='TenderedDateFormatted']").text(
              data["TenderedDateFormatted"]
            );
          }

          if (
            data["Origin"]["City"] === null ||
            data["Origin"]["State"] === null
          ) {
            data["OriginFormatted"] = "Pending Data";
          } else {
            data[
              "OriginFormatted"
            ] = `${data["Origin"]["City"]}, ${data["Origin"]["State"]}`;
          }

          data["OriginZip"] = data["Origin"]["PostalCode"]
            ? data["Origin"]["PostalCode"]
            : "Pending Data";

          if (
            data["Consignee"]["City"] === null ||
            data["Consignee"]["State"] === null
          ) {
            data["ConsigneeFormatted"] = "Pending Data";
          } else {
            data[
              "ConsigneeFormatted"
            ] = `${data["Consignee"]["City"]}, ${data["Consignee"]["State"]}`;
          }

          data["ConsigneeZip"] = data["Consignee"]["PostalCode"]
            ? data["Consignee"]["PostalCode"]
            : "Pending Data";

          data["Weight"] = `${data["Weight"]} lbs`;

          if (data["PodText"]) {
            $("#js-track-podtext").show();
          }

          /* SET PREVIEW IMAGE */
          if (data["VpodImageUrl"]) {
            let $previewButton = $("#js-track-toggle-preview"),
              $previewImage = $("#js-track-preview-image"),
              imageLoadTimeout = 10000; // 10 seconds

            $previewButton.show();

            let vpod_image = new Image();
            vpod_image.alt = "Picture of your delivery."; // Alt text for the image
            vpod_image.loading = "lazy"; // Add lazy loading attribute

            vpod_image.onload = function () {
              clearTimeout(imageTimeout); // Image loaded successfully
            };

            vpod_image.onerror = function () {
              clearTimeout(imageTimeout);
            };

            function loadVpodImage() {
              vpod_image.src = data["VpodImageUrl"]; // Set the image src
            }

            // Start loading the image
            loadVpodImage();

            // Set a timeout
            const imageTimeout = setTimeout(() => {
              vpod_image.onerror(); // If no img, trigger error
            }, imageLoadTimeout);

            // Append the image to the container
            $previewImage.empty().append(vpod_image);

            // Add click event handler to the preview button
            $previewButton.on("click", (e) => {
              e.preventDefault();
              $previewImage.fadeToggle();
            });
          }

          /* TOP STATUS TEXT (BELOW TRACKING NUMBER) */

          switch (firstEventCode) {
            case "ALPK":
            case "DSPD":
            case "OFPU":
            case "OE":
            case "PKUP":
            case "PU":
            case "LR":
            case "LM":
            case "OS":
            case "CUPT":
            case "ARRD":
            case "ORIG":
            case "LW":
            case "CUDA":
            case "CUDI":
            case "CUDP":
            case "CUDD":
            case "CUED":
            case "CURP":
            case "FWDG":
            case "RMOH":
            case "LOAD":
            case "FCTF":
            case "RD":
            case "SFCT":
            case "RCVD":
            case "CRRT":
            case "CA":
            case "OFDL":
            case "OD":
              $trackStatusLabel.text(
                `Arriving ${formatDate(data.ExpectedDeliveryDate)}`
              );

              break;
            case "DI":
            case "RL":
            case "LR":
            case "LM":
            case "EXFT":
            case "DLAY":
            case "LLNH":
            case "LODK":
            case "MBKD":
            case "RB":
            case "FTCF":
            case "FWED":
            case "MSST":
            case "MR":
            case "MS":
            case "WTDL":
            case "BW":
            case "MC":
            case "CA":
            case "HO":
            case "BCLD":
            case "CO":
            case "UTLV":
            case "AN":
            case "NH":
            case "RRDV":
            case "AI":
            case "NDMI":
            case "ACSS":
            case "UG":
              $trackStatusLabel.text(`Delayed ${formattedDate}`);

              break;

            case "DN":
            case "DLVD":
            case "CL":
            case "DW":
            case "OK":
            case "FOTO":
            case "DD":
            case "NFRP":
              $trackStatusLabel.text(
                `Delivered ${formatDate(data.UtcDeliveryDateTime)}`
              );

              $("#js-track-delivered-date").text(
                `DELIVERED ${formatDate(data.UtcDeliveryDateTime)}`
              );

              break;
            case "XX":
            case "AUTO":
            case "EXRL":
            case "INRL":
            case "OVRC":
              $trackStatusLabel.text(
                `Expected ${formatDate(data.ExpectedDeliveryDate)}`
              );
              break;
            case "HP":
            case "HW":
            case "AFPR":
            case "ONHD":
              $trackStatusLabel.text(`Held as of ${formattedDate}`);

              break;
            case "CRRT":
            case "RTNG":
            case "CCLP":
            case "RFDM":
            case "WA":
            case "ER":
              $trackStatusLabel.text(`Return Pending ${formattedDate}`);
              break;
            case "UM":
            case "CTRF":
            case "DR":
            case "CR":
            case "EMAR":
            case "EMOH":
            case "RETN":
            case "RETD":
            case "RS":
              $trackStatusLabel.text(`Returned ${formattedDate}`);
              break;
            case "CCLP":
            case "DR":
            case "CR":
            case "EMAD":
            case "EMOD":
            case "LOST":
            case "LC":
            case "UD":
            case "MSPK":
            case "PUKT":
            case "PURU":
              $trackStatusLabel.text(`Undeliverable as of ${formattedDate}`);

              break;

            default:
              $trackStatusLabel.text("Pending Data");
          }

          /* PROGRESS BAR AND DYNAMIC DROPDOWN OPTIONS */

          let progressPercent, progressColor;

          let $serviceActions = $("#js-available-service-actions");

          let dropdown_options = {
            ATPDSPND: "Tracking shows attempted but I was home",

            CSERCPLN: "Customer Service experience feedback",

            DELRDISP: "Tracking shows delivered; no package",

            DLVRINST: "Add delivery instructions to order",

            RTSCSTRF: "Don't deliver my package",

            RPRTDLAY: "My delivery is delayed",

            PDAMAGED: "Package was delivered damaged",

            FEEDBACK: "Delivery experience feedback",
          };

          $.each(data, (item, index) => {
            $(`[name='${item}']`).val(data[item]);

            $(`[name='${item}']`).text(data[item]);
          });

          $.each(statusCodes, (index, code) => {
            if (firstEventCode == code["CODE"]) {
              progressColor = code["COLOR"];

              progressPercent = `${20 * code["PROGRESS"]}%`;

              // Set the FontAwesome icon
              let iconHtml = "";
              switch (code.ICON) {
                case "stop":
                  iconHtml =
                    '<i class="fa-light fa-circle-xmark" style="color: #ffffff"></i>';
                  break;
                case "alert":
                  iconHtml =
                    '<i class="fa-light fa-circle-exclamation" style="color: #101820"></i>';
                  break;
                case "arrow":
                  iconHtml =
                    '<i class="fa-light fa-circle-arrow-right" style="color: #ffffff"></i>';
                  break;
                case "info":
                  iconHtml =
                    '<i class="fa-light fa-circle-info" style="color: #ffffff"></i>';
                  break;
                case "check":
                  iconHtml =
                    '<i class="fa-light fa-circle-check" style="color: #ffffff"></i>';
                  break;
              }
              $("#progress-circle").html(iconHtml);

              // Check if the progress level is zero
              if (code["PROGRESS"] === 0) {
                // Unhide #tracking__waiting
                $("#tracking__waiting").css("display", "block");
              } else {
                // Hide #tracking__waiting (if it should be hidden when progress is not zero)
                $("#tracking__waiting").css("display", "none");
              }

              /* Dynamic dropdown options based on EventCode */

              Object.keys(dropdown_options).forEach(function (key) {
                if (code[key]) {
                  $serviceActions.append(
                    $("<option></option>")
                      .val(code[key])

                      .html(dropdown_options[key])
                  );
                }
              });


              // Final NotifyMe block

              if (code["NOTIFYME"]) {
                $("#js-track-notify").attr(
                  "style",
                  "display: block !important;"
                );
              }

              return false;
            }
          });

          /* ALL ONTRAC EVENTS */

          $.each(data["Events"], (index, event) => {
            let city = event["City"];

            let state = event["State"];

            let cityFormatted = "";

            if (city !== null && state !== null) {
              cityFormatted = `${city}, ${state}`;
            }

            let eventDate = formatDate(event["ZonedEventDateTime"]);

            let eventTime = formatTime(event["ZonedEventDateTime"]);

            event["DateFormatted"] = `${eventDate} ${eventTime}`;

            $("#js-track-events-list").append(
              `<tr>

<td><label class='u-show-sp'>DATE & TIME</label>${event["DateFormatted"]}</td>

<td><label class='u-show-sp'>EVENT</label> ${event["EventShortDescription"]}</td>

<td><label class='u-show-sp'>CITY</label> ${cityFormatted}</td>

</tr>`
            );
          });

          /* SHOW DATA ON PAGE */

          $("#js-track-container").fadeIn();

          $trackProgress.css("background-color", progressColor);

          $trackProgress.css("width", progressPercent);

          $("#js-track-form").show();
        },

        error: function (xhr, status, error) {
          $loader.hide();

          $("#js-eyecatch").attr("style", "display: flex !important");

          $("#js-eyecatch").css("opacity", 1);

          if (xhr.status === 414) {
            $("#js-track-error-message").show();

            $("#js-track-error-message").text(" that number");
          } else {
            $("#js-track-error-message").show();

            // Check if trackingNumber is greater than 50 characters

            if (trackingNumber.length > 50) {
              $("#js-track-error-message strong").text(" that tracking number");
            } else {
              $("#js-track-error-message strong").text(trackingNumber);
            }
          }
        },
      });
    } else {
      $("#js-eyecatch").attr("style", "display: flex !important");

      $("#js-eyecatch").css("opacity", 1);
    }
  }
})(jQuery);
