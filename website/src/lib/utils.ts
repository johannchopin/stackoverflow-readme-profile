export const replaceAll = (str: string, find: string, replace: string): string => {
  return str.split(find).join(replace)
}

export const getProfileCode = (codeTemplate: string, userId: number, template: string): string => {
  return replaceAll(
    replaceAll(codeTemplate, ':id', userId.toString()), 
    ':template', 
    template
  )
}

export const setClipboard = (text) => { navigator.clipboard.writeText(text) }
