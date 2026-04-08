document.addEventListener('DOMContentLoaded', function () {
  var topicStorageKey = 'tamara_topic_choice';

  document.querySelectorAll('[data-track-standard]').forEach(function (element) {
    element.addEventListener('click', function () {
      if (typeof fbq === 'function') {
        fbq('track', element.getAttribute('data-track-standard'));
      }
    });
  });

  document.querySelectorAll('[data-track-custom]').forEach(function (element) {
    element.addEventListener('click', function () {
      if (typeof fbq === 'function') {
        fbq('trackCustom', element.getAttribute('data-track-custom'));
      }
    });
  });

  document.querySelectorAll('[data-topic]').forEach(function (element) {
    element.addEventListener('click', function () {
      var topic = element.getAttribute('data-topic');

      try {
        localStorage.setItem(topicStorageKey, topic);
      } catch (error) {
        void error;
      }

      if (typeof fbq === 'function') {
        fbq('trackCustom', 'TopicSelected', { topic: topic });
      }
    });
  });

  var selectedTopicElement = document.querySelector('[data-selected-topic]');
  if (selectedTopicElement) {
    var params = new URLSearchParams(window.location.search);
    var topic = params.get('topic');

    if (!topic) {
      try {
        topic = localStorage.getItem(topicStorageKey) || '';
      } catch (error) {
        topic = '';
      }
    }

    if (topic) {
      selectedTopicElement.textContent = 'Вы выбрали тему: ' + topic;
    } else {
      selectedTopicElement.textContent = 'Выберите удобное направление и переходите в WhatsApp.';
    }
  }
});
