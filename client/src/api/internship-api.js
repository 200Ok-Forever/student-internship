import { getRequest, postRequest } from './base';

export const getInternshipRecommendations = async (type, token) => (
  await getRequest(
    `/Internship/internships/recommend?type=${type}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
)

export const getInternshipHistory = async (token) => (
  await getRequest(
    `/Internship/internships/history`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
)

export const getSavedInternships = async (token) => (
  await getRequest(
    `/Internship/internships/save`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
)

export const getInternshipEvents = async (token) => (
  await getRequest(
    `/Internship/events`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
)

export const postInternshipCalendar = async (data, token) => (
  await postRequest(
    '/Internship/internships/calendar',
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
)

export const postInternshipUncalendar = async (data, token) => (
  await postRequest(
    '/Internship/internships/uncalendar',
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
)

export const postInternshipSave = async (id, token) => (
  await postRequest(
    '/Internship/internships/save',
    {
      internship_id: id
    }, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
)

export const postInternshipUnsave = async (id, token) => (
  await postRequest(
    '/Internship/internships/unsave',
    {
      internship_id: id
    }, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
)