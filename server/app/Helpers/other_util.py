from sqlalchemy import inspect

def convert_object_to_dict(obj):
  return {str(c.key): getattr(obj, c.key) for c in inspect(obj).mapper.column_attrs}

def convert_model_to_dict(rows):
  return [convert_object_to_dict(row) for row in rows]