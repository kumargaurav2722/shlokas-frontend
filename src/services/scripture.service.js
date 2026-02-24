import { api } from "./api";

export const getWorks = (category) =>
  api.get("/texts/works", {
    params: category ? { category } : {}
  });

export const getSubWorks = (work, category) =>
  api.get("/texts/sub-works", {
    params: {
      work,
      ...(category ? { category } : {})
    }
  });

export const getSubWorkStats = (work, category) =>
  api.get("/texts/sub-work-stats", {
    params: {
      work,
      ...(category ? { category } : {})
    }
  });

export const getChapters = (work, subWork) =>
  api.get("/texts/chapters", {
    params: { work, sub_work: subWork }
  });

export const getChapterStats = (work, subWork, category) =>
  api.get("/texts/chapter-stats", {
    params: {
      work,
      sub_work: subWork,
      ...(category ? { category } : {})
    }
  });

export const getVerses = (work, subWork, chapter, languages) =>
  api.get("/texts/verses", {
    params: {
      work,
      sub_work: subWork,
      chapter,
      ...(languages ? { languages } : {})
    }
  });
