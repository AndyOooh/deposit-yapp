export const checkWalletAvailability = async (deepLink: string) => {
  return new Promise<boolean>(resolve => {
    const timeout = setTimeout(() => {
      resolve(false);
    }, 3000);

    window.addEventListener(
      "blur",
      () => {
        clearTimeout(timeout);
        resolve(true);
      },
      { once: true }
    );

    window.location.href = deepLink;
  });
};
