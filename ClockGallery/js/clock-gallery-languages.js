(function () {
  const gallery = window.clockGalleryContent;
  const languageSelector = document.getElementById('languageSelector');
  if (!gallery || !languageSelector) return;

  const languages = gallery.languages || [];
  const languageById = Object.fromEntries(languages.map(function (language) {
    return [language.id, language];
  }));

  function audioPath(item, language) {
    const fileName = item[language + 'Audio'];
    return fileName ? 'Audio/' + languageById[language].folder + '/' + encodeURI(fileName) : '';
  }

  function ensureIntro(language) {
    let section = document.getElementById(language);
    if (section) return section;
    section = document.createElement('section');
    section.className = 'gallery-intro langCnt';
    section.id = language;
    section.innerHTML = '<h1></h1><p></p>';
    document.querySelector('main').insertBefore(section, document.getElementById('galleryGrid'));
    return section;
  }

  function renderOverview(language) {
    const intro = ensureIntro(language);
    document.querySelectorAll('.langCnt').forEach(function (section) {
      section.style.display = section.id === language ? 'block' : 'none';
    });
    intro.querySelector('h1').textContent = gallery.title[language];
    intro.querySelector('p').textContent = gallery.intro[language];
    document.getElementById('galleryGrid').innerHTML = gallery.items.map(function (item, index) {
      return '<article class="item-card" onclick="if(!event.target.closest(\'audio\'))location.href=\'item' + (index + 1) + '.html\'"><img src="Images/' + item.image + '" alt="' + item.accession + ': ' + item[language + 'Title'] + '"><h2>' + item.accession + ': ' + item[language + 'Title'] + '</h2><audio controls preload="metadata" src="' + audioPath(item, language) + '"></audio><p>' + item[language] + '</p></article>';
    }).join('');
  }

  function renderItem(language) {
    const item = gallery.items[Number(document.body.dataset.item)];
    if (!item) return;
    document.querySelectorAll('.langCnt').forEach(function (section) {
      section.style.display = section.id === language ? 'block' : 'none';
    });
    const section = document.querySelector('.langCnt[id="' + language + '"]') || document.querySelector('.bookContentDiv');
    section.style.display = 'block';
    section.querySelector('.cntHdng').textContent = item.accession + ': ' + item[language + 'Title'];
    section.querySelector('img').src = 'Images/' + item.image;
    section.querySelector('img').alt = item.accession;
    section.querySelector('.bookCntDiv').textContent = item[language];
    const audio = document.getElementById('languageAudio');
    audio.src = audioPath(item, language);
    audio.load();
  }

  languages.forEach(function (language) {
    if (!languageSelector.querySelector('option[value="' + language.id + '"]')) {
      const option = document.createElement('option');
      option.value = language.id;
      option.textContent = language.label;
      languageSelector.appendChild(option);
    }
  });

  const initialLanguage = languageSelector.value;
  if (document.getElementById('galleryGrid')) {
    languageSelector.onchange = function () { renderOverview(this.value); };
    renderOverview(initialLanguage);
  } else if (document.body.dataset.item !== undefined) {
    languageSelector.onchange = function () { renderItem(this.value); };
    renderItem(initialLanguage);
  }
}());