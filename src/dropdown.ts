export const setupDropdown = () => {
  const { computePosition, autoUpdate, arrow, flip } = FloatingUIDOM;
  let dropdown;
  let cleanupDropdown;
  let isOpen = false;
  document.querySelectorAll('[data-dropdown]').forEach(button => {
    if (!(button instanceof HTMLButtonElement)) return false;
    button.addEventListener('click', () => {
      if (isOpen) return false;
      if (!button.nextElementSibling) return false;
      dropdown = document.createElement('nav');
      dropdown.classList.add('dropdown');
      if (!(button.nextElementSibling instanceof HTMLTemplateElement)) return false;
      const children = [...Array.from(button.nextElementSibling.content.children)];
      children.forEach(child => {
        dropdown.appendChild(child.cloneNode(true));
      });
      const arrowElement = document.createElement('div');
      arrowElement.classList.add('arrow');
      // Thêm dropdown vào body
      dropdown.appendChild(arrowElement);
      document.body.appendChild(dropdown);

      setTimeout(() => {
        // Hiển thị dropdown
        if (dropdown) dropdown.classList.add('show');
        isOpen = true;
      });

      // Tự động cập nhật vị trí của dropdown
      cleanupDropdown = autoUpdate(button, dropdown, () => {
        computePosition(button, dropdown, {
          middleware: [
            FloatingUIDOM.offset(5), // Khoảng cách giữa button và dropdown
            FloatingUIDOM.shift({ padding: 5 }), // Đảm bảo dropdown không bị tràn ra ngoài màn hình
            flip(),
            arrow({ element: arrowElement }),
          ],
        }).then(({ x, y, middlewareData, placement }) => {
          // Đặt vị trí cho dropdown
          Object.assign(dropdown.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
          if (middlewareData.arrow) {
            const { x, y } = middlewareData.arrow;
            const side = placement.split('-')[0];

            const staticSide = {
              top: 'bottom',
              right: 'left',
              bottom: 'top',
              left: 'right',
            }[side];

            Object.assign(arrowElement.style, {
              left: x != null ? `${x}px` : '',
              top: y != null ? `${y}px` : '',
              [staticSide]: `${-arrowElement.offsetWidth / 2}px`,
              transform: 'rotate(45deg)',
            });
          }
        });
      });
    });
  });

  document.addEventListener('click', event => {
    if (isOpen && dropdown && event.target !== dropdown) {
      // Xóa phần tử khỏi DOM
      document.body.removeChild(dropdown);
      dropdown = null;
      isOpen = false;
      cleanupDropdown();
    }
  });
};
