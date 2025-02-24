export const setupMenuMobile = (collectionElementsByClass: HTMLCollectionOf<Element>) => {
  Array.from(collectionElementsByClass).forEach(el =>
    el.addEventListener('click', () => {
      const isShow = document.getElementById('hamburger')!.classList.contains('active');
      setTimeout(
        () => {
          toggleClassList(document.getElementById('bg-menu'), ['opacity-0', '-right-full', 'opacity-50', 'right-0']);
        },
        !isShow ? 0 : 200,
      );
      setTimeout(
        () => {
          toggleClassList(document.getElementById('hamburger'), ['active']);
          toggleClassList(document.getElementById('menu'), ['-right-80', 'right-0']);
          toggleClassList(document.getElementById('list-menu'), ['top-0', 'opacity-100', 'top-10', 'opacity-0']);
        },
        !isShow ? 200 : 0,
      );
    }),
  );
};
export const toggleClassList = (element: HTMLElement | null, classList: string[]) =>
  element && classList.forEach(e => element.classList.toggle(e));
