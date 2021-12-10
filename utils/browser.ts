/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// adapted from https://stackoverflow.com/a/9851769

// eslint-disable-next-line @typescript-eslint/ban-types
function isSafariRemoteNotification(pushNotification: object | string) {
  return pushNotification.toString() === '[object SafariRemoteNotification]'
}

const browser = {
  get isChrome(): boolean {
    const windowChrome = (window as any)?.chrome
    return (
      !!windowChrome && (!!windowChrome?.webstore || !!windowChrome.runtime)
    )
  },
  get isSafari(): boolean {
    const hasConstructorOnHTMLElement = /constructor/i.test(
      window.HTMLElement as any
    )
    if (hasConstructorOnHTMLElement) return true

    const windowSafari = (window as any)?.safari
    return isSafariRemoteNotification(windowSafari?.pushNotification ?? '')
  },
  get isFirefox(): boolean {
    const InstallTrigger = (window as any)?.InstallTrigger
    return typeof InstallTrigger !== 'undefined'
  },
}

export default browser
