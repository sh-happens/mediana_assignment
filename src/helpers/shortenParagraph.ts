export const shortenParagraph = (paragraph: string, maxLength: number | undefined = 100) => {
  if (paragraph.length <= maxLength) {
    return paragraph
  }
  let trimmedString = paragraph.substr(0, maxLength)
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  )

  return trimmedString + '...'
}
